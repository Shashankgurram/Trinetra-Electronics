// ElectroMart - Interactivity
(function(){
	const yearEl = document.getElementById('year');
	if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

	// Mobile nav toggle
	const navToggle = document.querySelector('.nav-toggle');
	const navMenu = document.getElementById('nav-menu');
	if(navToggle && navMenu){
		navToggle.addEventListener('click', () => {
			const expanded = navToggle.getAttribute('aria-expanded') === 'true';
			navToggle.setAttribute('aria-expanded', String(!expanded));
			navMenu.classList.toggle('show');
		});
	}

	// Dropdown
	document.querySelectorAll('.has-dropdown').forEach(parent => {
		const toggle = parent.querySelector('.dropdown-toggle');
		if(!toggle) return;
		toggle.addEventListener('click', () => {
			const open = parent.classList.contains('open');
			document.querySelectorAll('.has-dropdown').forEach(p => p.classList.remove('open'));
			if(!open){ parent.classList.add('open'); }
		});
		parent.addEventListener('mouseleave', () => parent.classList.remove('open'));
	});

	// Products
	const products = [
		{ id:1, name:'Galaxy S23', price:45999, category:'Mobiles', img:'images/samsung.webp' },
		{ id:2, name:'iPhone 14', price:79999, category:'Mobiles', img:'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop' },
		{ id:3, name:'LG Tv', price:56999, category:'Laptops', img:'images/lg.webp' },
		{ id:4, name:'Samsung Tv', price:46999, category:'Laptops', img:'images/tvsam.webp' },
		{ id:5, name:'LG AC', price:45999, category:'Accessories', img:'images/lgac.webp' },
		{ id:6, name:'Crompton Cooler', price:8999, category:'Accessories', img:'images/cooler.jpg' },
		{ id:7, name:'Whirlpool Fridge', price:39999, category:'Wearables', img:'images/whrilfridge.webp' },
		{ id:8, name:'LG Fridge', price:49999, category:'Wearables', img:'images/lgfridge.webp' },
	];

	const grid = document.getElementById('productGrid');
	function renderProducts(filter){
		if(!grid) return;
		const list = filter && filter !== 'All' ? products.filter(p => p.category === filter) : products;
		grid.innerHTML = list.map(p => `
			<article class="product-card" data-id="${p.id}">
				<div class="product-media"><img alt="${p.name}" src="${p.img}" loading="lazy"></div>
				<div class="product-info">
					<div class="product-name">${p.name}</div>
					<div class="product-meta">
						<div class="price">Rs.${p.price}</div>
						<button class="btn btn-primary add-btn" data-add="${p.id}">Add to Cart</button>
					</div>
				</div>
			</article>
		`).join('');
	}
	renderProducts('All');

	// Filter chips and menu links
	document.querySelectorAll('[data-filter]').forEach(el => {
		el.addEventListener('click', (e) => {
			const f = el.getAttribute('data-filter');
			if(!f) return;
			document.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
			const chip = document.querySelector(`.chip[data-filter="${f}"]`);
			if(chip) chip.classList.add('is-active');
			renderProducts(f);
		});
	});

	// Add to cart toast
	const toast = document.getElementById('toast');
	document.addEventListener('click', (e) => {
		const target = e.target;
		if(target && target.matches('[data-add]')){
			const id = Number(target.getAttribute('data-add'));
			const product = products.find(p => p.id === id);
			if(product && toast){
				toast.textContent = `${product.name} added to cart`;
				toast.classList.add('show');
				setTimeout(()=> toast.classList.remove('show'), 2000);
			}
		}
	});

	// Carousel
	const track = document.querySelector('.carousel-track');
	const slides = Array.from(document.querySelectorAll('.slide'));
	const prev = document.querySelector('.carousel-btn.prev');
	const next = document.querySelector('.carousel-btn.next');
	const dotsContainer = document.querySelector('.carousel-dots');
	let index = 0;
	function updateCarousel(){
		if(!track) return;
		track.style.transform = `translateX(-${index * 100}%)`;
		dotsContainer?.querySelectorAll('button').forEach((d,i)=>{
			d.classList.toggle('active', i===index);
		});
	}
	if(dotsContainer){
		slides.forEach((_,i)=>{
			const b = document.createElement('button');
			b.addEventListener('click', ()=>{ index = i; updateCarousel(); });
			dotsContainer.appendChild(b);
		});
	}
	prev?.addEventListener('click', ()=>{ index = (index - 1 + slides.length) % slides.length; updateCarousel(); });
	next?.addEventListener('click', ()=>{ index = (index + 1) % slides.length; updateCarousel(); });
	updateCarousel();
	const carouselEl = document.querySelector('.carousel');
	const auto = carouselEl?.getAttribute('data-autoplay') === 'true';
	const interval = Number(carouselEl?.getAttribute('data-interval') || 5000);
	if(auto){ setInterval(()=>{ index = (index + 1) % slides.length; updateCarousel(); }, interval); }

	// Chat modal
	const chatModal = document.getElementById('chatModal');
	const openChat = document.getElementById('openChat');
	const closeChat = document.getElementById('closeChat');
	const chatForm = document.getElementById('chatForm');
	const chatField = document.getElementById('chatField');
	const chatBody = document.getElementById('chatBody');
	function showChat(show){ if(chatModal){ chatModal.setAttribute('aria-hidden', show? 'false' : 'true'); }}
	openChat?.addEventListener('click', ()=> showChat(true));
	closeChat?.addEventListener('click', ()=> showChat(false));
	chatForm?.addEventListener('submit', (e)=>{
		e.preventDefault();
		const text = chatField?.value?.trim();
		if(!text) return;
		const u = document.createElement('div');
		u.className = 'user';
		u.textContent = text;
		chatBody?.appendChild(u);
		if(chatField) chatField.value = '';
		setTimeout(()=>{
			const b = document.createElement('div');
			b.className = 'bot';
			b.textContent = 'Thanks! A support agent will be with you shortly.';
			chatBody?.appendChild(b);
			chatBody?.scrollTo({ top: chatBody.scrollHeight, behavior:'smooth' });
		}, 700);
	});
})();
