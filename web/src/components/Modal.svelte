<script>
    
	export let FileName;

	function closeModal(){
		const $this = this;
		document.querySelectorAll(".modal").forEach(it => {
			it.className = "modal";
		});
	}

	export let src;
</script>

<div>
	<div id="modal" class="modal">
		<div class="modal-background" on:click={closeModal}></div>
		<div class="modal-content">
			<div class="card box">
				<header class="card-header subtitle is-5">
					{FileName}
				</header>
				<div class="card-content">
                    <img src="{src}" alt="">
				</div>
				<footer class="card-footer">
					<a class="button is-success is-small" href={src}>
						下载
					</a>
				</footer>
			</div>
		</div>
		<button class="modal-close is-large" aria-label="close" on:click={closeModal}></button>
	</div>
</div>

<style> </style>
