[...document.querySelectorAll('.categories [data-category]')]
	.forEach(e => e.addEventListener('click', function() {
		this.parentElement.setAttribute(
			'data-selected', 
			this.getAttribute('data-category')
		);
	}));

let clicks = 0;

const soldOut = $el => {
	const drop1 = () => {
		$el.closest('.item').style.zIndex = 10;
		$el.style.transformOrigin = '2.5% 5%';
		let ease = 'power1.inOut';
		const tl = gsap.timeline()
			.to($el, { rotate: 130, duration: 0.6, ease })
			.to($el, { rotate: 60, duration: 0.5, ease })
			.to($el, { rotate: 100, duration: 0.4, ease })
			.to($el, { rotate: 85, duration: 0.35, ease })
			.to($el, { rotate: 92.5, duration: 0.3, ease })
			.to($el, { rotate: 90, duration: 0.275, ease });

		ease = 'power2.in';
		gsap.to($el, { y: 3000, duration: 1.5, delay: 2, ease, onStart: () => tl.kill(), onComplete: () => { 
			$el.closest('.item').removeAttribute('style');
			$el.remove(); 
		} });
	};
	
	const drop2 = () => {
		$el.closest('.item').style.zIndex = 10;
		const duration = 1;
		gsap.to($el, { rotate: 1800, duration, ease: 'power1.out' });
		gsap.to($el, { x: Math.random() * 1000 - 500, duration, ease: 'power1.out' });
		gsap.to($el, { 
			y: 2000, 
			duration, 
			ease: CustomEase.create('custom', 'M0,0 C0.107,-0.118 0.346,-0.137 0.477,0 0.687,0.219 1,1 1,1'),
			onComplete: () => { 
				$el.closest('.item').removeAttribute('style');
				$el.remove(); 
			} 
		});
	};
	
	([5, 9].includes(++clicks) ? drop2 : drop1)();
};

[...document.querySelectorAll('.add-to-cart')].forEach($btn => {
	$btn.addEventListener('click', () => {
		$btn.closest('.item').classList.add('sold-out');
		soldOut($btn);
	}, { once: true });
});

