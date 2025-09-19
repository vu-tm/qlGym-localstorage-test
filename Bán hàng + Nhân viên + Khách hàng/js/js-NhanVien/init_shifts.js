(function () {
    if (!localStorage.getItem('shifts')) {
        localStorage.setItem('shifts', JSON.stringify([]));
        console.log('Khởi tạo shifts rỗng trong localStorage');
    } else {
        console.log('shifts đã tồn tại:', JSON.parse(localStorage.getItem('shifts')));
    }
})();