let autocomplete;

function initAutoComplete(){
autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('id_address'),
    {
        types: ['geocode', 'establishment'],
        //default in this app is "IN" - add your country code
        componentRestrictions: {'country': ['in']},
    })
// function to specify what should happen when the prediction is clicked
autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged (){
    var place = autocomplete.getPlace();

    // User did not select the prediction. Reset the input field or alert()
    if (!place.geometry){
        document.getElementById('id_address').placeholder = "Start typing...";
    }
    else{
        console.log('place name=>', place.name)
    }
    // get the address components and assign them to the fields
}


$(document).ready(function(){
    // ADD TO CART
    $('.add_to_cart').on('click', function(e){
        e.preventDefault()
        food_id = $(this).attr("data-id")
        url = $(this).attr("data-url")
        $.ajax({
            type: 'GET',
            url: url,
            success: function(response){
                console.log(response)
                if(response.status == 'login_required'){
                    Swal.fire(response.message, '', 'info').then(function(){
                        window.location = '/login';
                    })
                } else if(response.status == 'failed'){
                    Swal.fire(response.message, '', 'error')
                } else {
                    console.log(response)
                    $('#cart_counter').html(response.cart_counter["cart_count"])
                    $('#qty-' + food_id).html(response.qty)

                    // Subtotal, tax and grand total update
                    applyCartAmounts(response.cart_amount['subtotal'], response.cart_amount['tax'], response.cart_amount['grand_total'])
                }
            }
        })
    })

    // Place the cart item quantity on load
    $('.item-qty').each(function(){
        var id = $(this).attr('id')
        var qty = $(this).attr('data-qty')
        $('#' + id).html(qty)
    })

    $('.decrease_cart').on('click', function(e){
        e.preventDefault()
        food_id = $(this).attr("data-id")
        cart_id = $(this).attr("id")
        url = $(this).attr("data-url")
        $.ajax({
            type: 'GET',
            url: url,
            success: function(response){
                console.log(response)
                if(response.status == 'login_required'){
                    Swal.fire(response.message, '', 'info').then(function(){
                        window.location = '/login';
                    })
                } else if(response.status == 'failed'){
                    Swal.fire(response.message, '', 'error')
                } else {
                    $('#cart_counter').html(response.cart_counter["cart_count"])
                    $('#qty-' + food_id).html(response.qty)
                    removeCartItem(response.qty, cart_id)
                    checkEmptyCart()
                    applyCartAmounts(response.cart_amount['subtotal'], response.cart_amount['tax'], response.cart_amount['grand_total'])
                }
            }
        })
    })

    // Delete Cart Item
    $('.delete_cart').on('click', function(e){
        e.preventDefault()
        cart_id = $(this).attr("data-id")
        url = $(this).attr("data-url")
        $.ajax({
            type: 'GET',
            url: url,
            success: function(response){
                console.log(response)
                if(response.status == 'login_required'){
                    Swal.fire(response.message, '', 'info').then(function(){
                        window.location = '/login';
                    })
                } else if(response.status == 'failed'){
                    Swal.fire(response.message, '', 'error')
                } else {
                    console.log(response)
                    $('#cart_counter').html(response.cart_counter['cart_count'])
                    Swal.fire(response.message,'','success')
                    removeCartItem(0, cart_id)
                    checkEmptyCart()
                    applyCartAmounts(response.cart_amount['subtotal'], response.cart_amount['tax'], response.cart_amount['grand_total'])
                }
//                else {
//                    $('#cart_counter').html(response.cart_counter["cart_count"])
//                    $('#qty-' + food_id).html(response.qty)
//                }
            }
        })
    })

    // Delete the cart element if the qty is 0
    function removeCartItem(cartItemQty, cart_id){
        if(window.location.pathname == '/cart/'){
            if(cartItemQty <= 0){
                document.getElementById('cart_item-' + cart_id).remove()
            }
        }
    }

    function checkEmptyCart(){
        var cart_counter = document.getElementById('cart_counter').innerHTML
        console.log("Cart Counter: " + cart_counter)
        if(window.location.pathname == '/cart/'){
            if(cart_counter == 0){
            console.log("Cart Counter is 0")
            document.getElementById('empty_cart').style.display = "block"
            }
        }
    }

    function applyCartAmounts(subtotal, tax, grand_total){
        if(window.location.pathname == '/cart/'){
            $('#subtotal').html(subtotal)
            $('#tax').html(tax)
            $('#total').html(grand_total)
        }

    }
});