var shoppingCart = (function()
	{
		// private
		var cart = [];

		function Item(name, price, count)
		{
			this.name = name;
			this.price = price;
			this.count = count;
		} 

		function saveCart()
		{
			localStorage.setItem("shoppingCart", JSON.stringify(cart));
		}


		function loadCart()
		{
			cart = JSON.parse(localStorage.getItem("shoppingCart"));

			if (cart === null)
			{
				cart = [];
			}
		}

		loadCart();

		// public
		var obj = {};

		obj.addToCart = function(name, price, count)
		{
			for (var i in cart)
			{
				if (cart[i].name === name)
				{
					cart[i].count += count;
					saveCart();
					return;
				}
			}

			var item = new Item(name, price, count);
			console.log(cart);

			cart.push(item);
			saveCart();
		};


		obj.setCountItem = function(name, count)
		{
			for (var i in cart)
			{
				if (cart[i].name === name)
				{
					cart[i].count = count; // STRING
					break;
				}
			}

			saveCart();
		};

		obj.removeFromCart = function(name)
		{
			for (var i in cart)
			{
				if (cart[i].name === name)
				{
					cart[i].count--;

					if (cart[i].count === 0)
					{
						cart.splice(i, 1)
					}

					break;
				}
			}

			saveCart();
		};


		obj.removeFromCartAll = function(name)
		{
			for (var i in cart)
			{
				if (cart[i].name === name)
				{
					cart.splice(i, 1);
					break;
				}
			}

			saveCart();
		};


		obj.clearCart = function()
		{
			cart = [];
			saveCart();
		};


		obj.countCart = function()
		{

			var totalCount = 0;

			for (var i in cart)
			{
				totalCount += cart[i].count;
			}

			return totalCount;
		};


		obj.totalCart = function()
		{
			var totalCost = 0;

			for (var i in cart)
			{
				totalCost += cart[i].price * cart[i].count;
			}

			return totalCost.toFixed(2);
		};

		obj.shippingPrice = function()
		{
			
			var totalCost = 0;

			var totalCount = 0;
			for (var i in cart)
			{
				totalCount += cart[i].count;
			}


			if (totalCount == 0)
			{
				return totalCost;
			}
			else if (totalCount >= 1 && totalCount <= 3)
			{
				totalCost = 4.99;
				return totalCost;
			}
			else
			{
				totalCost = 9.99;
				return totalCost;
			}
		}

		obj.taxPrice = function()
		{
			var taxPercent = 10;

			var totalCost = 0;

			for (var i in cart)
			{
				totalCost += cart[i].price * cart[i].count;
			}

			var tempAdd = (taxPercent * totalCost) / 100;

			return tempAdd.toFixed(2);

		}

		obj.listCart = function()
		{
			var cartCopy = [];
			
			//loop thru items in cart
			for (var i in cart)
			{
				var item = cart[i];
				var itemCopy = {};

				// loop thru properties in an item
				for (var p in item)
				{
					itemCopy[p] = item[p];
				}
				itemCopy.total = (item.price * item.count).toFixed(2);
				cartCopy.push(itemCopy);
			}

			return cartCopy;
		};

		return obj;

	}) ();
