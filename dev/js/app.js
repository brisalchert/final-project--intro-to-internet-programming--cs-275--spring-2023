window.onload = () => {
    // Add your code below
    let dimension = window.prompt(`Enter the size of your square matrix:`);

    // Check that the input is an integer greater than 1
    while (isNaN(parseInt(dimension)) || parseInt(dimension) < 2) {
        alert(`Invalid input. Please try again.`);

        dimension = window.prompt(`Enter the size of your square matrix:`);
    }
};
