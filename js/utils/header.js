/**
 * header template with timer and lives
 */
export default function(data) {
  const stats = data ? `
    <h1 class="game__timer">
		30
	</h1>
	<div class="game__lives">
		${new Array(3 - data.lives)
			.fill(`<img src="img/heart-empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
			.join('')
		}
		${new Array(data.lives)
			.fill(`<img src="img/heart-full.svg" class="game__heart" alt="Life" width="32" height="32">`)
			.join('')
		}
	</div>
  ` : ``;

  const head = `
    <header class="header">
      <div class="header__back">
        <span class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo-100.png" width="101" height="44">
        </span>
      </div>
      ${stats}
    </header>`;

  return head;
}
