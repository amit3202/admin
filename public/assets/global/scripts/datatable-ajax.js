var TableDatatablesManaged = function () {
   
    var initTable1 = function () {
       
        var table = $('#user_list');

        // begin first table
        table.dataTable({

            // Internationalisation. For more info refer to http://datatables.net/manual/i18n
            // "language": {
            //     "aria": {
            //         "sortAscending": ": activate to sort column ascending",
            //         "sortDescending": ": activate to sort column descending"
            //     },
            //     "emptyTable": "No data available in table",
            //     "info": "Showing _START_ to _END_ of _TOTAL_ records",
            //     "infoEmpty": "No records found",
            //     "infoFiltered": "(filtered1 from _MAX_ total records)",
            //     "lengthMenu": "Show _MENU_",
            //     "search": "Search:",
            //     "zeroRecords": "No matching records found",
            //     "paginate": {
            //         "previous":"Prev",
            //         "next": "Next",
            //         "last": "Last",
            //         "first": "First"
            //     }
            // },

            "ajax": {
                "url": "http://localhost:3202/admin/administrator/data", // ajax source
                "type": "POST"
            },
            "bProcessing" : true,
                        "bPaginate" : true,
                        "bServerSide" : true,
            "lengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 5,            
             "pagingType": "full_numbers",
            "columnDefs": [
                {  // set default column settings
                    'orderable': false,
                    'targets': [0]
                }, 
                {
                    "searchable": false,
                    "targets": [0]
                },
                {
                    "className": "dt-right", 
                    //"targets": [2]
                }
            ],
            "order": [
                [1, "asc"]
            ] // set first column as a default sort by asc
        });

        var tableWrapper = jQuery('#sample_1_wrapper');

        table.find('.group-checkable').change(function () {
            var set = jQuery(this).attr("data-set");
            var checked = jQuery(this).is(":checked");
            jQuery(set).each(function () {
                if (checked) {
                    $(this).prop("checked", true);
                    $(this).parents('tr').addClass("active");
                } else {
                    $(this).prop("checked", false);
                    $(this).parents('tr').removeClass("active");
                }
            });
        });

        table.on('change', 'tbody tr .checkboxes', function () {
            $(this).parents('tr').toggleClass("active");
        });
    }

    return {
        
        //main function to initiate the module
        init: function () {
        
            initTable1();
           
        }

    };

}();

jQuery(document).ready(function() {
   // $('#user_list').DataTable();
    TableDatatablesManaged.init();
});