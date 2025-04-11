$(document).ready(function () {
  // Initialize draggable items
  $(".draggable-item").draggable({
    revert: "invalid",
    cursor: "move",
    zIndex: 100,
    start: function () {
      $(this).addClass("dragging");
      $("#dropContainer").addClass("highlight");
      showStatus("Drag started...", "info");
    },
    stop: function () {
      $(this).removeClass("dragging");
      $("#dropContainer").removeClass("highlight");
    },
    helper: "clone", // This ensures we're working with a clone during drag
  });

  // Initialize droppable area
  $("#dropContainer").droppable({
    accept: ".draggable-item",
    hoverClass: "highlight",
    drop: function (event, ui) {
      const originalItem = ui.draggable;
      const itemId = originalItem.data("id");

      // Remove the placeholder text if it exists
      $("#dropContainer p").remove();

      // Move the original item instead of cloning
      originalItem.appendTo("#dropContainer");

      showStatus(`Item ${itemId} dropped successfully!`, "success");
    },
  });

  // Make drag container also a droppable area to return items
  $("#dragContainer").droppable({
    accept: ".draggable-item",
    hoverClass: "highlight",
    drop: function (event, ui) {
      const draggedItem = ui.draggable;
      const itemId = draggedItem.data("id");

      // Move the item back to drag container
      draggedItem.appendTo("#dragContainer");

      // If drop container is empty, show placeholder
      if ($("#dropContainer").children().length === 0) {
        $("#dropContainer").append(
          '<p style="color: #6c757d; margin-top: 50%;">Drop items here</p>'
        );
      }

      showStatus(`Item ${itemId} returned to source`, "info");
    },
  });

  // Reset button functionality - FIXED
  $("#resetBtn").click(function () {
    // Move all items back to drag container
    $("#dropContainer")
      .find(".draggable-item")
      .each(function () {
        $(this).appendTo("#dragContainer");
      });

    // Restore the drop container placeholder
    $("#dropContainer")
      .empty()
      .append(
        '<p style="color: #6c757d; margin-top: 50%;">Drop items here</p>'
      );

    showStatus("All items have been reset", "success");
  });

  // Show status message
  function showStatus(message, type) {
    const $status = $("#statusMessage");
    $status.text(message).fadeIn();

    // Set color based on type
    switch (type) {
      case "success":
        $status.css({
          "background-color": "#d4edda",
          color: "#155724",
          border: "1px solid #c3e6cb",
        });
        break;
      case "warning":
        $status.css({
          "background-color": "#fff3cd",
          color: "#856404",
          border: "1px solid #ffeeba",
        });
        break;
      case "info":
      default:
        $status.css({
          "background-color": "#d1ecf1",
          color: "#0c5460",
          border: "1px solid #bee5eb",
        });
    }

    // Hide after 3 seconds
    setTimeout(function () {
      $status.fadeOut();
    }, 3000);
  }
});
