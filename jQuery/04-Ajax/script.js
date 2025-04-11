$(document).ready(function () {
  // API endpoints
  const API = {
    posts: "https://jsonplaceholder.typicode.com/posts",
    users: "https://jsonplaceholder.typicode.com/users",
  };

  // Show status message
  function showStatus(message, type) {
    const $status = $("#statusMessage");
    $status.html(message).fadeIn();

    // Set color based on type
    switch (type) {
      case "success":
        $status.css({
          "background-color": "#d4edda",
          color: "#155724",
          border: "1px solid #c3e6cb",
        });
        break;
      case "error":
        $status.css({
          "background-color": "#f8d7da",
          color: "#721c24",
          border: "1px solid #f5c6cb",
        });
        break;
      case "loading":
        $status.css({
          "background-color": "#e2e3e5",
          color: "#383d41",
          border: "1px solid #d6d8db",
        });
        $status.append('<span class="loading"></span>');
        break;
      case "info":
      default:
        $status.css({
          "background-color": "#d1ecf1",
          color: "#0c5460",
          border: "1px solid #bee5eb",
        });
    }

    // Hide after 5 seconds (except for loading)
    if (type !== "loading") {
      setTimeout(function () {
        $status.fadeOut();
      }, 5000);
    }
  }

  // Clear status message
  function clearStatus() {
    $("#statusMessage").fadeOut();
  }

  // Fetch data from API
  function fetchData(url, type) {
    showStatus(`Fetching ${type}...`, "loading");

    $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      success: function (data) {
        clearStatus();
        displayData(data, type);
        showStatus(`Successfully fetched ${data.length} ${type}`, "success");
      },
      error: function (xhr, status, error) {
        showStatus(`Error fetching ${type}: ${error}`, "error");
      },
    });
  }

  // Display fetched data
  function displayData(data, type) {
    const $container = $("#dataContainer");
    $container.empty();

    if (data.length === 0) {
      $container.append(
        '<p style="text-align: center; color: #6c757d;">No data available.</p>'
      );
      return;
    }

    if (type === "posts") {
      data.slice(0, 10).forEach((post) => {
        $container.append(`
                        <div class="data-item">
                            <h3>${post.title}</h3>
                            <p>${post.body}</p>
                            <p><small>Post ID: ${post.id} | User ID: ${post.userId}</small></p>
                        </div>
                    `);
      });
    } else if (type === "users") {
      data.slice(0, 10).forEach((user) => {
        $container.append(`
                        <div class="data-item">
                            <h3>${user.name}</h3>
                            <p>Email: ${user.email}</p>
                            <p>Phone: ${user.phone}</p>
                            <p>Website: ${user.website}</p>
                            <p><small>User ID: ${user.id}</small></p>
                        </div>
                    `);
      });
    }
  }

  // Clear all data
  function clearData() {
    $("#dataContainer").html(
      '<p style="text-align: center; color: #6c757d;">No data fetched yet. Click a button above to load data.</p>'
    );
    showStatus("Data cleared", "info");
  }

  // Event listeners
  $("#fetchPostsBtn").click(function () {
    fetchData(API.posts, "posts");
  });

  $("#fetchUsersBtn").click(function () {
    fetchData(API.users, "users");
  });

  $("#clearBtn").click(clearData);
});
