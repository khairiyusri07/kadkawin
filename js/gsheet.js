
      // Function to fetch and display data
      function fetchData() {
          $.getJSON('https://script.google.com/macros/s/AKfycbzf-OpdVJQ42bNW6v8ewAc6hjKygfJ7PoJmNSy5k5sq36j40eTQFvk9kYmfXyt-lvA/exec', function(data) {
              // Create table headers
              var headerRow = $('<tr></tr>');
              $.each(data.data[0], function(key, value) {
                  headerRow.append('<th>' + key + '</th>');
              });
              $('#myTable thead').append(headerRow);

              // Create table rows
              $.each(data.data, function(index, row) {
                  var rowHtml = '<tr>';
                  $.each(row, function(key, value) {
                      rowHtml += '<td>' + value + '</td>';
                  });
                  rowHtml += '</tr>';
                  $('#myTable tbody').append(rowHtml);
              });
          });
      }

      // Call the fetchData function on page load
      $(document).ready(fetchData);
