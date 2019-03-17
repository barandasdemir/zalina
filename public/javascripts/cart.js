$(document).ready(function () {
    let cartQty = Number.parseInt($('#cartQty')[0].innerHTML);

    $('.button-rm').click((event) => {
        const item = event.target.parentElement.parentElement.parentElement;
        $.ajax({
                method: 'POST',
                url: `/cart/remove`,
                data: {
                    id: item.id,
                }
            })
            .done((cart) => {
                $('#cartQty')[0].innerText = --cartQty;
                item.remove();
                if ($('.button-rm').length < 1) {
                    $('.cart').remove();
                    $('.container.cartwrapper').append('<h6><b>Alışveriş sepetiniz boş!</b></h6><p style="padding-bottom: 2em;">Alışveriş sepetinize ürün kaydetmek veya daha önce kaydedilmiş ürünlere erişmek için oturum açın.</p>');
                }
            });
    });

    $(".button-buy").click(() => {
        const loc = window.location.href.split('/');
        $.ajax({
                method: 'POST',
                url: `/cart/add`,
                data: {
                    id: loc[loc.length - 1],
                }
            })
            .done(() => {
                $('#cartQty')[0].innerText = ++cartQty;
                M.toast({
                    html: `'${$('.productName')[0].innerText}' alışveriş sepetinize eklendi!`,
                    classes: 'rounded'
                });
            });
    });

    $('.qtyMinus').click((event) => {
        const item = event.target.parentElement.parentElement.parentElement.parentElement;
        // const productName = event.target.parentElement.parentElement.childNodes[3].innerText.split('\n')[0];
        const itemQty = event.target.parentElement.children[1];
        if (Number.parseInt(itemQty.innerText) - 1 > 0) {
            $.ajax({
                    method: 'POST',
                    url: `/cart/remove`,
                    data: {
                        id: item.id,
                    }
                })
                .done((product) => {
                    $('#cartQty')[0].innerText = --cartQty;
                    itemQty.innerText = Number.parseInt(itemQty.innerText) - 1;
                    itemQty.parentElement.parentElement.children[6].innerText = `Toplam: ${product.totalPrice.toFixed(2)} ₺`;
                });
        }
    });

    $('.qtyPlus').click((event) => {
        const item = event.target.parentElement.parentElement.parentElement.parentElement;
        let itemQty = event.target.parentElement.children[1];
        $.ajax({
                method: 'POST',
                url: `/cart/add`,
                data: {
                    id: item.id,
                }
            })
            .done((product) => {
                $('#cartQty')[0].innerText = ++cartQty;
                itemQty.innerText = Number.parseInt(itemQty.innerText) + 1;
                itemQty.parentElement.parentElement.children[6].innerText = `Toplam: ${product.totalPrice.toFixed(2)} ₺`;
            });
    });
});
