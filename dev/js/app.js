const matrixContainer = document.getElementById(`matrix-container`);

window.onload = () => {
    // Add your code below
    let dimension = window.prompt(`Enter the size of your square matrix:`);

    // Check that the input is an integer greater than 1
    while (isNaN(parseInt(dimension)) || parseInt(dimension) < 2) {
        alert(`Integers less than 2 are not allowed. Please try again.`);

        dimension = window.prompt(`Enter the size of your square matrix:`);
    }

    // Print the header for the original matrix
    let originalMatrixHeader = document.createElement(`h2`);
    originalMatrixHeader.innerText += `Original Matrix`;
    matrixContainer.appendChild(originalMatrixHeader);

    // Print the original matrix
    let originalMatrix = document.createElement(`table`);
    matrixContainer.appendChild(originalMatrix);

    for (let row = 0; row < dimension; row++) {
        let matrixRow = document.createElement(`tr`);

        for (let column = 0; column < dimension; column++) {
            let matrixCell = document.createElement(`td`);

            // Set the cell value to the correct number from 1 to (dimension)^2
            let cellValue = ((row * dimension) + column + 1);
            matrixCell.innerText += `${cellValue}`;

            // Add class `diagonal` if the cell is on the diagonal
            if ((row + column) === (dimension - 1)) {
                matrixCell.className = `diagonal`;
            }

            // Add the cell to the matrix row
            matrixRow.appendChild(matrixCell);
        }

        // Add the row to the matrix
        originalMatrix.appendChild(matrixRow);
    }
};
