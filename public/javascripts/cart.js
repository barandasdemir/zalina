$(document).ready(function () {
    let cartQty = Number.parseInt($('#cartQty')[0].innerHTML);

    const sendAjax = (action, id) => {
        return $.ajax({
            method: 'POST',
            url: `/cart/${action}`,
            data: {
                id,
            }
        });
    }

    $('.button-rm').click(() => {
        console.log($(this));
        // const item = $(this).parent().parent().parent();
        // const id = item[0].attributes.id.value;
        // sendAjax('remove', id)
        //     .done(() => {
        //         $('#cartQty')[0].innerText = --cartQty;
        //         item.parent().remove();
        //         if ($('.button-rm').length < 1) {
        //             $('.cart').remove();
        //             $('.container.cartwrapper').append('<h6><b>Alışveriş sepetiniz boş!</b></h6><p style="padding-bottom: 2em;">Alışveriş sepetinize ürün kaydetmek veya daha önce kaydedilmiş ürünlere erişmek için oturum açın.</p>');
        //         }
        //     });
    });

    $(".button-buy").click(() => {
        const loc = window.location.href.split('/');
        sendAjax('add', loc[loc.length - 1])
            .done(() => {
                $('#cartQty')[0].innerText = ++cartQty;
                M.toast({
                    html: `'${$('.productName')[0].innerText}' alışveriş sepetinize eklendi!`,
                    classes: 'rounded'
                });
            });
    });

    $('#qtyMinus').click(() => {
        const item = $(this).parent().parent().parent().parent();
        const id = item[0].attributes.id.value;
        let itemQty = Number.parseInt($(this).parent().children()[1].innerText);
        if (--itemQty > 0) {
            sendAjax('remove', id)
                .done(() => {
                    $('#cartQty')[0].innerText = --cartQty;
                    $('#itemQty')[0].innerText = itemQty;
                });
        }
    });

    $('#qtyPlus').click(() => {
        const item = $(this).parent().parent().parent();
        const id = item[0].attributes.id.value;
        let itemQty = Number.parseInt($('.itemQty')[0].innerText);
        sendAjax('add', id)
            .done(() => {
                $('#cartQty')[0].innerText = ++cartQty;
                $('#itemQty')[0].innerText = ++itemQty;
            });
    });
});
