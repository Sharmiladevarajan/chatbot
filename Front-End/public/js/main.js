function handleFileSelect(event) {
    const fileInput = event.target;
    const selectedFileContainer = document.getElementById('selectedFileContainer');
    const selectedFileName = document.getElementById('selectedFileName');
  
    if (fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      selectedFileName.textContent = selectedFile.name;
      selectedFileContainer.style.display = 'flex';
    }
  }
  
  function removeSelectedFile() {
    const fileInput = document.getElementById('fileInput');
    const selectedFileContainer = document.getElementById('selectedFileContainer');
    const selectedFileName = document.getElementById('selectedFileName');
  
    // Clear the file input
    fileInput.value = null;
  
    // Clear and hide the selected file container
    selectedFileName.textContent = '';
    selectedFileContainer.style.display = 'none';
  }
  

  //scroll to bottom scripts
  $(document).ready(function() {
    var scrollableDiv = $(".ai-content-container");
    var scrollToBottomButton = $(".ai-downarrow");

    function toggleScrollButton() {
        var scrollPosition = scrollableDiv?.scrollTop();
        var scrollHeight = scrollableDiv[0]?.scrollHeight;
        var distanceFromBottom = scrollHeight - scrollPosition - scrollableDiv?.height();
    
        if (distanceFromBottom > 50) {
            scrollToBottomButton.css("display", "flex").fadeIn();         
        } else {
            scrollToBottomButton.fadeOut();
        }
      }
         // Set scroll position to the bottom on page refresh
  scrollableDiv.scrollTop(scrollableDiv[0]?.scrollHeight);
      // Initial state check
      toggleScrollButton();
    
      // Scroll event handler
      scrollableDiv.scroll(function() {
        toggleScrollButton();
      });
    
    scrollToBottomButton.click(function() {
      // Scroll to the bottom of the scrollable div
      scrollableDiv.animate({ scrollTop: scrollableDiv[0]?.scrollHeight }, 500);
    });




    });