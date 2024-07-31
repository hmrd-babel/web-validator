jQuery(function() { 
    M.AutoInit();
    init();

    function clearCards(){
        $("#totalResults").hide();
        $("#violations").hide();
        $("#violations").html('');
        $("#noErrors").hide();
        $("#violationTemplate").hide();
    }

    function displayTotals(results){
        $("#totalTests").html(results.totalRan);
        $("#totalPassed").html(results.totalPassed);
        $("#totalFailed").html(results.totalFailed);
        $("#totalViolations").html(results.violations.length);
        $("#totalResults").show();
    }
    
    function initaccordion(){
        $(".accordion-header").on("click", function() {
            var content = $(this).next(".accordion-content");
    
            // Toggle the display of the content
            if (content.is(":visible")) {
                content.slideUp();
            } else {
                // Close all other open contents
                $(".accordion-content").slideUp();
                content.slideDown();
            }
        });
    }

    function displayResults(violations) {
        if (violations.length === 0) {
            $("#noErrors").show();
            return;
        }
    
        $("#violations").show();
        $("#violations").html('');

        $("#violationTemplate").tmpl(violations).appendTo("#violations");
        initaccordion();
    }

    function init(){
        clearCards();

        const urlForm = $('#urlForm');
        const spinner = $('.spinner');

        urlForm.on('submit', function (event) {
            event.preventDefault();

            const url = $('#url').val();
            if (!url) return;

            clearCards();
            spinner.show();

            setTimeout( async () => {
                const response = await fetch('/check', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url }),
                });
            
                const results = await response.json();
                spinner.hide();
                displayTotals(results);
                displayResults(results.violations.sort(({impactNumber:a}, {impactNumber:b}) => a-b));
            }, 2000); 
        });

        initaccordion();
    }
});

