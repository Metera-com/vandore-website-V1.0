$(function () {
    'use strict';

    // Ambil semua formulir yang ingin kita terapkan gaya validasi kustom Bootstrap
    const forms = $('.needs-validation');

    // Loop melalui formulir dan mencegah pengiriman
    forms.on('submit', function (event) {
        const form = $(this);
        var actionInput = form.find("input[name='action']");

        if (!form[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            if (actionInput.val() == "subscribe") {
                $('.submit_subscribe').html('Sending...');
            }
            else if (actionInput.val() == "appointment") {
                $('.submit_appointment').html('Sending...');
            } else {
                $('.submit_form').html('Sending...');
            }
            
            const toast = new bootstrap.Toast($('.success_msg')[0]);
            const errtoast = new bootstrap.Toast($('.error_msg')[0]);
            var formData = form.serialize();
            
            $.ajax({
                type: "POST",
                url: "php/form_process.php",
                data: formData,
                success: function (response) {
                    if (response === 'success') {
                        form[0].reset(); // Kosongkan formulir setelah sukses
                        form.removeClass('was-validated'); // Hapus validasi sebelumnya

                        if (actionInput.val() === 'subscribe') {
                            $('.submit_subscribe').html('<i class="rtmicon rtmicon-arrow-right"></i>'); 
                            const toast_comment = new bootstrap.Toast($('.success_msg_subscribe')[0]);
                            toast_comment.show();
                        } else if (actionInput.length > 0) {
                            if (actionInput.val() === 'appointment') {
                                form.find('.submit_appointment').html('Submit');
                                const toast_appointment = new bootstrap.Toast($('.success_msg_appointment')[0]);
                                toast_appointment.show();
                            }
                        } else {
                            toast.show();
                            $('.submit_form').html('Send Message <i class="rtmicon rtmicon-arrow-right"></i>');
                        }
                    } else {
                        console.log('errorrrrrr');
                        $('.submit_form').html('Send Message <i class="rtmicon rtmicon-arrow-up-right"></i>');
                        $('.submit_subscribe').html('<i class="rtmicon rtmicon-arrow-right"></i>');
                        $('.submit_appointment').html('Submit');
                    }
                }
            });
        }
        
        form.addClass('was-validated');
    });
});
