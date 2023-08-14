const history = [{ squares: Array(9).fill(null) }];
            let currentMove = 0;
            let xIsNext = true;

            const statusElement = document.createElement('div');
            const boardElement = document.createElement('div');
            const gameInfoElement = document.createElement('div');
            const olElement = document.createElement('ol');

            const rootElement = document.getElementById('root');
            rootElement.appendChild(statusElement);
            rootElement.appendChild(boardElement);
            rootElement.appendChild(gameInfoElement);
            gameInfoElement.appendChild(olElement);

            function render() {
                const current = history[currentMove];
                const squares = current.squares;

                const winner = calculateWinner(squares);
                let status;
                if (winner) {
                    status = 'Winner: ' + winner;
                } else {
                    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
                }
                statusElement.textContent = status;

                boardElement.innerHTML = '';
                for (let i = 0; i < 3; i++) {
                    const rowElement = document.createElement('div');
                    rowElement.className = 'board-row';
                    for (let j = 0; j < 3; j++) {
                        const index = 3 * i + j;
                        const squareElement = document.createElement('button');
                        squareElement.className = 'square';
                        squareElement.textContent = squares[index];
                        squareElement.addEventListener('click', () => handleClick(index));
                        rowElement.appendChild(squareElement);
                    }
                    boardElement.appendChild(rowElement);
                }

                olElement.innerHTML = '';
                history.forEach((step, move) => {
                    const buttonElement = document.createElement('button');
                    const liElement = document.createElement('li');
                    buttonElement.textContent = move > 0 ? 'Go to move #' + move : 'Go to game start';
                    buttonElement.addEventListener('click', () => jumpTo(move));
                    liElement.appendChild(buttonElement);
                    olElement.appendChild(liElement);
                });
            }

            function handleClick(i) {
                const current = history[currentMove];
                const squares = current.squares.slice();
                if (calculateWinner(squares) || squares[i]) {
                    return;
                }
                squares[i] = xIsNext ? 'X' : 'O';
                xIsNext = !xIsNext;
                currentMove++;
                history.push({ squares });
                render();
            }

            const jumpTo = (move) => {
                history.splice(move + 1);
                currentMove = move;
                xIsNext = move % 2 === 0;
                render();
            }

            function calculateWinner(squares) {
                const lines = [
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8],
                    [0, 3, 6],
                    [1, 4, 7],
                    [2, 5, 8],
                    [0, 4, 8],
                    [2, 4, 6],
                ];
                for (let i = 0; i < lines.length; i++) {
                    const [a, b, c] = lines[i];
                    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                        return squares[a];
                    }
                }
                return null;
            }

            render();