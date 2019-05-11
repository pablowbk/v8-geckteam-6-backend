// Error Handling

const axios = dada;

const url = 'http://frankqui.com'

// 1) try / catch Example
async function displatData() {
	try {
		const wes = await axios.get(url)
		//code
	} catch (error) {
			console.log(error)
	}
}


// 2) High Order Component Example
	async function yolo() {
		const wes = await axios.get('https://nono.com')
	}
// HIGHORDERFUNCTION
function handleError(fn) {
	return function (...params) {
		return fn(...params).catch( function (err) {
			console.error('Oops', err);
		});
	}
}

// ES6 pro
const handleError = fn => (...params) => fn(...params).catch(console.error);


const safeYolo = handleError(yolo);

safeYolo();



// Express examples
const getOrders = async (req, res, next) => {
	const orders = Orders.find({ email: req.user.email });
	if (!orders.length) throw Error('No Orders found');
};

// No Error handling in this route would crash the app
router.get('/orders', getOrders);

const displayErrors = async (error, req, res, next) => {
	res.status(err.status || 500);
	res.render('error', { error });
}

const catchErrors = (fn) => {
	return function (req, res, next) {
		return fn(req,res, next).catch(next);
	};
};


// ES6 pro
const catchErrors = (fn) => (req, res, next) =>fn(req, res, next).catch(next)


app.use(displayErrors)

router.get('/orders', catchErrors(getOrders));


// node example
process.on('unhandledRejection', error => {
	console.log('unhandledRejection', error);
})

