//Dashboard Widgets

//Bar Chart
function initializeBarChart(element="", url="", label="", categories = "") {
    model = Highcharts.chart(element, {
		chart: {
			renderTo: 'histogram',
			type: 'column',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
		},
		title: {
			text: ''
		},
		subtitle: {
			text: ''
		},
		xAxis: {
			categories: categories,
			labels: {
				align: 'center',
				style: {
					fontSize: '10px',
					textShadow: false,
					fontFamily: 'Trebuchet MS, Verdana, sans-serif'
				}
			}
		},
		yAxis: {
			min: 0,
			title: {
				text: ''
			}
		},
		legend: {
			enabled: true
		},
		tooltip: {
			headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:1f}</b></td></tr>',
			footerFormat: '</table>',
			shared: true,
			useHTML: true
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0,
				dataLabels: {
					enabled: true
				}
			}
		},
		colors: ["#a3c18f", "#3b3d5c", "#D64646", "#3c3e5e", "#D5F21B", "#B3AA00", "#C07878", "#78C08b", "#C0b878", "#7892c0", "#a3c18f", "#F6BD0F", "#8BBA00", "#FF8E46", "#008E8E", "#D64646", "#3c3e5e", "#588526", "#B3AA00", "#C07878", "#78C08b", "#C0b878", "#7892c0", "#a3c18f", "#F6BD0F", "#8BBA00", "#FF8E46", "#3c3e5e", "#D64646", "#3c3e5e", "#588526", "#B3AA00", "#C07878", "#78C08b", "#C0b878", "#7892c0", "#aeb1d2", "#F6BD0F", "#8BBA00", "#FF8E46", "#008E8E", "#D64646", "#8E468E"],
	});

    return model;
}

function requestBarChartData(element="", url="", label="", data="") {
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        data : data,
        success:function(res) {
            if(res.success == true) {
                console.log(res.data.length);
                chart = initializeBarChart(element, "", "", res.categories);
                for (var i = 0; i < res.data.length; i++) {
                    chart.addSeries({
                        name: res.data[i].name,
                        data: res.data[i].data
                    });
                }
            }
            else {
                toastr.error(res.message);
            }
        },
        error: function(data){
            console.log(data.responseText);
            toastr.error(data.responseText.replace(/[^a-zA-Z ]/g, " "));
        },
        cache: true
    });
}

//Pie Chart
function initializePieChart(element, url, label, categories = "") {
    var model = Highcharts.chart(element, {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            },
        }
    });

    return model;
}

function requestPieChartData(element, url, label, data) {
    chart = initializePieChart(element, url, label);
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        data : data,
        success:function(res) {
            if(res.success == true) {
                if(res.total != 0) {
                    chart.addSeries({
                        name: label,
                        data: res.data,
                        // events: {
                        //     click: function() {
                        //         location.href = "institute-analytics", '_blank';
                        //     }
                        // },
                        point: {
                            events: {
                                click: function() {
                                    location.href = this.options.url;
                                }
                            }
                        }
                    });
                }
                else {
                    chart.renderer.text('No Data Available', 140, 120)
                    .css({
                        color: '#8d93a1',
                        fontSize: '3em',
                        textAlign: 'center'
                    }).add();
                }
            }
            else {
                toastr.error(res.message);
            }
        },
        error: function(data){
            console.log(data.responseText);
            toastr.error(data.responseText.replace(/[^a-zA-Z ]/g, " "));
        },
        cache: true
    });
}

//year Filter selectbox
function generateArrayOfYearsInSelectBox(className) {
    if($("." + className).length) {
        var elements = $('.' + className);
        var max = new Date().getFullYear();
        var min = max - 40;
        for(var z=0;z<elements.length; z++){
            var element = elements.eq(z);
            for (var i = max; i >= min; i--) {
                $(element).append(new Option(i, i));
            }
        }
    }
}

//Assign Start-up profile status
function assginReviewer(id, videopitching)
{
    $('input[name="videoPitchingAllowed"]').val(videopitching);
    $("#id").val(id);
    $("#reviewerModal").modal('toggle');
}

function assginStatus(id,url,title,btnText="",remarksText ="")
{
    if(btnText != "") {
        $("#assignStatusModalButton").html(btnText);
    }
    if(remarksText != "") {
        $("#assignStatusModalRemarks").html(remarksText);
    }
    $("#assign_status_id").val(id);
    $("#assignStatusModalLabel").html(title);
    $("#assign_status_form").attr('action', url);
    $("#assignStatusModal").modal('toggle');
}

function revertChangesStatus(id,url,title)
{
    $("#revert_changes_id").val(id);
    $("#revertChangesModalLabel").html(title);
    $("#revert_changes_form").attr('action', url);
    $("#revertChangesModal").modal('toggle');
}

function shortlist_for_training(id,url,title)
{
    $("#training_id").val(id);
    $("#trainingAssignModalLabel").html(title);
    $("#training_form").attr('action', url);
    $("#trainingAssignModal").modal('toggle');
}

//Model actions
function dismiss_model(element) {
    $('#' + element).modal('toggle');
}

//Date Comparsions
function compare_with_other_date(date1, date2, lable1 = "other date", lable2 = "other date") {
    var first_date = new Date($("#"+date1).val());
    var second_date = new Date($("#"+date2).val());

    if(first_date > second_date){
        $("#"+date2).val("");
        // $("#"+date2).text("");
        toastr.warning(lable2 + " should be greater than " + lable1);
    }
}

//File validation
function valid_ext(element) {
    var img_ext = $(element).val().split('.').pop().toLowerCase();
    if ($.inArray(img_ext, ['pdf', 'doc', 'docx', 'csv', 'xslx', 'xlsx']) == -1) {
        $(element).val('');
        toastr.error('invalid format');
    }
    if(element.files.length >0 && element.files[0].size > 10000000) {
        toastr.error("Please upload file less than 10MB.");
        $(element).val('');
    }
}

//File validation
function valid_ext_with_image(element) {
    var img_ext = $(element).val().split('.').pop().toLowerCase();
    if ($.inArray(img_ext, ['pdf', 'doc', 'docx', 'csv', 'xslx', 'xlsx', 'jpeg', 'jpg', 'png']) == -1) {
        $(element).val('');
        toastr.error('invalid format');
    }
    if(element.files.length >0 && element.files[0].size > 10000000) {
        toastr.error("Please upload file less than 10MB.");
        $(element).val('');
    }
}

function valid_ext_image_only(element) {
    var img_ext = $(element).val().split('.').pop().toLowerCase();
    if ($.inArray(img_ext, ['jpeg', 'jpg', 'png']) == -1) {
        $(element).val('');
        toastr.error('invalid format');
    }
    if(element.files.length >0 && element.files[0].size > 10000000) {
        toastr.error("Please upload file less than 10MB.");
        $(element).val('');
    }
}

function valid_ext_video_only(element) {
    var img_ext = $(element).val().split('.').pop().toLowerCase();
    if ($.inArray(img_ext, ['mp4', 'mkv', 'avi']) == -1) {
        $(element).val('');
        toastr.error('invalid format');
    }
    if(element.files.length >0 && element.files[0].size > 10000000) {
        toastr.error("Please upload file less than 10MB.");
        $(element).val('');
    }
}

//File validation
function delete_confirm() {
    confirm("Are you confirm to delete!");
}

//Phone plugin
function intiPhonePlugin(className) {
    if (className.length !== 0) {
        for (var i = 0; i < className.length; i++) {
            var slides = document.getElementsByClassName(className[i]);
            if (slides.length !== 0) {
                for (var z = 0; z < slides.length; z++) {
                    var input = slides[z];
                    input.addEventListener('click', digitValidate(input));
                    var iti = window.intlTelInput(input, {
                        separateDialCode: true
                    });
                    iti.setCountry("pk");
                }
            }
        }
    }
};

//DataTable plugin
function intiDataTablePlugin(className) {
    if ($("." + className).length) {
        var elements = $('.' + className);
        for(var i=0;i<elements.length; i++){
            var element = elements.eq(i);
            $(element).DataTable();
        }
    }
};

//Tinymce plugin
function intiTinymcePlugin(className) {
    if ($("." + className).length) {
        tinymce.init({
            selector: 'textarea.' + className,
            setup: function (editor) {
                editor.on('change', function () {
                    tinymce.triggerSave();
                });
            },
            height: 300,
            menubar: true,
            branding: false,
            dataType: "jsonp",
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount', 'image'
            ],
            toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
            content_css: '//www.tiny.cloud/css/codepen.min.css'
        });
    }
};

function intiTinymceNewPlugin(className) {
    if ($("." + className).length) {
        tinymce.init({
            selector: 'textarea.' + className,
            setup: function (editor) {
                editor.on('change', function () {
                    tinymce.triggerSave();
                });
            },
            height: 200,
            menubar: true,
            branding: false,
            dataType: "jsonp",
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount', 'image'
            ],
            toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
            content_css: '//www.tiny.cloud/css/codepen.min.css'
        });
    }
};

//DatePicker plugin
function intiDatePickerPlugin(className) {
    if ($("." + className).length) {
        var elements = $('.' + className);
        for(var i=0;i<elements.length; i++){
            var element = elements.eq(i);
            if(!element.data('date_picker')) {
                element.attr('type', "text");
                element.datepicker('destroy').datepicker({
                    uiLibrary: 'bootstrap4',
                    dateFormat: 'yy-mm-dd'
                });
                element.prop('readonly', true);
            }
        }
    }
};

//CurrentDatePicker plugin
function intiCurrentDatePickerPlugin(className) {
    if ($("." + className).length) {
        var elements = $('.' + className);
        for(var i=0;i<elements.length; i++){
            var element = elements.eq(i);
            if(!element.data('date_picker')) {
                element.attr('type', "text");
                element.datepicker({
                    uiLibrary: 'bootstrap4',
                    dateFormat: 'yy-mm-dd',
                });
            }
            element.prop('readonly', true);
        }
    }
};

//DateTimePicker plugin
function intiDateTimePickerPlugin(className) {
    if ($("." + className).length) {
        var elements = $('.' + className);
        for(var i=0;i<elements.length; i++){
            var element = elements.eq(i);
            if(!element.data('date_time_picker')) {
                element.attr('type', "text");
                element.datetimepicker('destroy').datetimepicker({
                    uiLibrary: 'bootstrap4',
                    format:false,
                });
                element.prop('readonly', true);
            }
        }
    }
};

//Allow digits only to type
function digitValidate(element) {
    element.value = element.value.replace(/\D/g,'');
    function inputValidate() {
        element.value = element.value.replace(/\D/g,'');
    }

    element.addEventListener('input', inputValidate);
    element.addEventListener('onkeypress', inputValidate);
    element.addEventListener('onkeyup', inputValidate);
    element.addEventListener('onkeydown', inputValidate);
    element.addEventListener('onchange', inputValidate);
}

//remove element
function removeDiv(element) {
    $('#' + element).remove();
}

//Ajax formdata to ajax
function getAllFieldsInFormDataFormat(form) {
    var form_data = new FormData();
    var $textfields = $('#'+form + ' :input[type=text]');
    var $passwordfields = $('#'+form + ' :input[type=password]');
    var $urlfields = $('#'+form + ' :input[type=url]');
    var $datefields = $('#'+form + ' :input[type=date]');
    var $checkboxfields = $('#'+form + ' :input[type=checkbox]');
    var $radiofields = $('#'+form + ' :input[type=radio]');
    var $hiddenfields = $('#'+form + ' :input[type=hidden]');
    var $select = $('#'+form + ' select');
    var $numberfields = $('#'+form + ' :input[type=number]');
    var $emailfields = $('#'+form + ' :input[type=email]');
    var $filefields = $('#'+form + ' :input[type=file]');
    var $textareafields = $('#'+form + ' textarea');

    $textfields.each(function() {
        form_data.append(this.name, $(this).val());
    });
    $passwordfields.each(function() {
        form_data.append(this.name, $(this).val());
    });
    $urlfields.each(function() {
        form_data.append(this.name, $(this).val());
    });
    $datefields.each(function() {
        form_data.append(this.name, $(this).val());
    });
    $checkboxfields.each(function() {
        if(this.checked == true) {
            form_data.append(this.name, $(this).val());
        }
    });
    $radiofields.each(function() {
        form_data.append(this.name, $(this).val());
    });
    $hiddenfields.each(function() {
        form_data.append(this.name, $(this).val());
    });
    $select.each(function() {
        form_data.append(this.name, $(this).val());
    });
    $numberfields.each(function() {
        form_data.append(this.name, $(this).val());
    });
    $emailfields.each(function() {
        form_data.append(this.name, $(this).val());
    });
    $filefields.each(function() {
        form_data.append(this.name, $(this).prop('files')[0]);
    });
    $textareafields.each(function() {
        form_data.append(this.name, $(this).val());
    });

    return form_data;
}

function checkBoxValidation(checkBox) {
    if (checkBox.checked == true){
        checkBox.value = 1;
    } else {
        checkBox.value = 0;
    }
}

mobile_mask();
phone_mask();
cnic_mask();

function mobile_mask()
{
    var items_mobile_mask = document.getElementsByClassName('mobile_mask');
    Array.prototype.forEach.call(items_mobile_mask, function(element)
    {
        var mobileMask = new IMask(element,
        {
            mask: '+{92}(000)0000000',
            placeholder:
            {
                show: 'always'
            }
        });
    });
}

function phone_mask()
{
    var items_phone_mask = document.getElementsByClassName('phone_mask');
    Array.prototype.forEach.call(items_phone_mask, function(element)
    {
        var phoneMask = new IMask(element,
        {
            mask: '+{92}(00)00000000',
            placeholder:
            {
                show: 'always'
            }
        });
    });
}

function cnic_mask()
{
    var cnic_mask = document.getElementsByClassName('cnic_mask');

    Array.prototype.forEach.call(cnic_mask, function(element)
    {
        var cnicMask = new IMask(element,
        {
            mask: '00000-0000000-0',
            placeholder:
            {
                show: 'always'
            }
        });
    });
}

function pkr_currency_mask()
{
    var pkr_currency = document.getElementsByClassName('pkr_currency_mask');

    // Array.prototype.forEach.call(pkr_currency, function(element)
    // {
    //     var pkrCurrencyMask = new IMask(element,
    //     {
    //         mask: '$num',
    //         blocks: {
    //             num: {
    //             // nested masks are available!
    //             mask: Number,
    //             thousandsSeparator: ' '
    //             }
    //         }
    //     });
    // });
}

function number_mask()
{
    var number_mask = document.getElementsByClassName('number_mask');
}

//owl carosuel
function initOwlCarosuel(element) {
    $(element).owlCarousel({
        margin: 10,
        nav: true,
        loop: false,
        autoplay: true,
        autoplayTimeout: '2000',
        responsive: {
            0: {
            items: 1
            },
            600: {
            items: 2
            },
            1000: {
            items: 3
            }
        }
    });
}

function initBlogOwlCarosuel(element) {
    var owl = $(element).owlCarousel({
        nav: true,
        loop: false,
        dots: false,
        margin: 5,
        autoplay: true,
        autoplayTimeout: '3000',
        navContainer: '#nav',
        autoplayHoverPause:true,
        navText: [
            '<i class="fa fa-angle-left"></i>',
            '<i class="fa fa-angle-right"></i>'
        ],
        responsive:{
            0:{
                items:1
            },
            767:{
                items:2,
                nav:true
            },
            1200:{
                items:4,
                nav:true
            },
            1366:{
                items:4,
                nav:true
            },
            1440:{
                items:4,
                nav:true
            }
        }
    });

    return owl;
}

function initEventOwlCarosuel(element) {
    var owl = $(element).owlCarousel({
        nav: true,
        loop: false,
        dots: false,
        margin: 5,
        autoplay: true,
        autoplayTimeout: '3000',
        navContainer: '#nav',
        autoplayHoverPause:true,
        navText: [
            '<i class="fa fa-angle-left"></i>',
            '<i class="fa fa-angle-right"></i>'
        ],
        responsive:{
            0:{
                items:1
            },
            767:{
                items:4,
                nav:true
            },
            1200:{
                items:4,
                nav:true
            },
            1366:{
                items:4,
                nav:true
            },
            1440:{
                items:4,
                nav:true
            }
        }
    });

    return owl;
}

function initInnovationOwlCarosuel(element) {
    var owl = $(element).owlCarousel({
        nav: true,
        loop: false,
        dots: false,
        margin: 5,
        autoplay: true,
        autoplayTimeout: '3000',
        navContainer: '#nav',
        autoplayHoverPause:true,
        navText: [
            '<i class="fa fa-angle-left"></i>',
            '<i class="fa fa-angle-right"></i>'
        ],
        responsive:{
            0:{
                items:1
            },
            767:{
                items:3,
                nav:true
            },
            1200:{
                items:3,
                nav:true
            },
            1366:{
                items:3,
                nav:true
            },
            1440:{
                items:3,
                nav:true
            }
        }
    });

    return owl;
}

function initEmployeesOwlCarosuel(element) {
    var owl = $(element).owlCarousel({
        nav: true,
        loop: false,
        dots: false,
        margin: 5,
        // autoWidth:true,
        autoplay: true,
        autoplayTimeout: '3000',
        navContainer: '#nav',
        autoplayHoverPause:true,
        navText: [
            '<i class="fa fa-angle-left"></i>',
            '<i class="fa fa-angle-right"></i>'
        ],
        responsive:{
            0:{
                items:1
            },
            767:{
                items:1,
                nav:true
            }
        }
    });

    return owl;
}

//Get File to element
const srcToFile = async (src, fileName, element_id) => {
    const response = await axios.get(src + "#toolbar=0", {
        responseType: "blob",
    });
    var fileName = src.replace(/^.*[\\\/]/, '');
    const mimeType = response.headers["content-type"];
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(new File([response.data], fileName, { type: mimeType, }));//your file(s) reference(s)
    document.getElementById(element_id).files = dataTransfer.files;
};

function dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type:mime});
}

const base64ToFile = async (id, element_id) => {
    // For Live Server
    var base_url = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '') + "/";
    //For Localhost
    if(base_url.includes("localhost")) {
        base_url = "http://localhost/hec_administrative/public/";
    }

    var form_data = new FormData();
    form_data.append('id', id);
    form_data.append("_token", $('meta[name="csrf-token"]').attr('content'));
    $.ajax({
        url: base_url + "get-image-blob",
        method:"POST",
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success:function(res) {
            try {
                const obj = JSON.parse(res);
                if(obj.success == true) {
                    var fileName = obj.data.name;
                    const mimeType = obj.data.type;

                    var file = dataURLtoFile("data:"+ mimeType + ";base64," + obj.data.image, fileName);
                    console.log(file);

                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);//your file(s) reference(s)
                    document.getElementById(element_id).files = dataTransfer.files;
                }
                else {
                    console.log("obj.message");
                }
            } catch (error) {
                console.log(error);
            }
        }
    });
};

//base64 to image
function getImageBlob(id, element) {
    if(id) {
        // For Live Server
        var base_url = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '') + "/";
        //For Localhost
        if(base_url.includes("localhost")) {
            base_url = "http://localhost/hec_administrative/public/";
        }

        $("#" + element).attr("src", base_url + "assets/img/placeholder.jpg");
        $("#" + element).attr("alt", "loading");
        var form_data = new FormData();
        form_data.append('id', id);
        form_data.append("_token", $('meta[name="csrf-token"]').attr('content'));

        axios.post(
            base_url + "get-image-blob",
            form_data
        ).then(function (response) {
            const obj = response.data;
            if (obj.success == true) {
                var elms = document.querySelectorAll("[id='" + element + "']");

                for (var i = 0; i < elms.length; i++) {
                    elms[i].setAttribute("src", "data:" + obj.data.type + ";base64," + obj.data.image);
                    elms[i].setAttribute("alt", obj.data.name);
                }
            }
            else {
                console.log(obj.message);
                $("#" + element).attr("src", base_url + "assets/img/placeholder.jpg");
                $("#" + element).attr("alt", "loading");
            }
        })
        .catch(function (error) {
            $("#" + element).attr("src", base_url + "assets/img/placeholder.jpg");
            $("#" + element).attr("alt", "loading");
            console.log(error.message);
        });
    }
}

//read more
function convertToReadMore(className) {
    var maxLength = 60;
    $("."+className).each(function() {
        var myStr = $(this).text();
        if ($.trim(myStr).length > maxLength) {
            var newStr = myStr.substring(0, maxLength);
            var removedStr = myStr.substring(maxLength, $.trim(myStr).length);
            $(this).empty().html(newStr);
            $(this).append('<span class="c-more-text">' + newStr + " " + removedStr + '</span>');
            $(this).append(' <a href="javascript:void(0);" class="c-read-more fw-bold text-dark" onclick="readMoreModal(this)">Read More...</a>');
        }
    });
}

function readMoreModal(elemt) {
    $("#staticBackdrop").modal('show');
    $("#staticBackdropBody").html($(elemt).siblings(".c-more-text").html());
}

// Confirm Delete SweetAlert2
function deleteConfirmSweetAlert(form,data){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            form.submit();
        }
    })
}

// Something Went Wrong SweetAlert2
function somethingWentWrongSweetAlert(msg){
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: msg,
    })
}

// Success SweetAlert2
function successSweetAlert(msg){
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: msg,
    })
}

// Save Confirm SweetAlert2
function saveConfirmSweetAlert(form){
    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            form.submit();
            //Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    })
}

// Delete Using Axios
function deleteByAxios(elmt,url){
    Swal.fire({
        icon: 'question',
        title: 'Are you sure?',
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Don't Delete`,
    }).then((result) => {
        if (result.isConfirmed) {
            $('#processing-spinner').show();

            axios.post(
                url
            ).then(function (response) {
                const obj = response.data;
                if(obj.success == true) {
                    $('#processing-spinner').hide();
                    $(elmt).parent().parent().remove();
                    successSweetAlert(obj.message);
                }
                else {
                    $('#processing-spinner').hide();
                    somethingWentWrongSweetAlert(obj.message);
                    $('#processing-spinner').hide();
                }
            })
            .catch(function (error) {
                $('#processing-spinner').hide();
                console.log(error);
                somethingWentWrongSweetAlert(error.response.data.message);
            });
        }
    });
}

//Age Calculate
function ageCalculator(elmt1,elmt2) {
    var userinput = $(elmt1).val();
    var dob = new Date(userinput);

    if(userinput==null || userinput=='') {
      document.getElementById("message").innerHTML = "**Choose a date please!";
      return false;
    }
    else {
        //calculate month difference from current date in time
        var month_diff = Date.now() - dob.getTime();

        //convert the calculated difference in date format
        var age_dt = new Date(month_diff);

        //extract year from date
        var year = age_dt.getUTCFullYear();

        //now calculate the age of the user
        var age = Math.abs(year - 1970);

        //set the calculated age to given element
        $("#" + elmt2).val(age);
    }
}
