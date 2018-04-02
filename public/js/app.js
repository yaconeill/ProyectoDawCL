$(() => {
    Image = function (category, type, path) {
        this.category = category;
        this.type = type;
        this.path = path;
    }

    loadData();
    var path = 'https://firebasestorage.googleapis.com/v0/b/coffeeapp-171e9.appspot.com/o/';
    var token = '?alt=media&token=b89c44db-789c-4946-944e-68019da9ee8d';
    var db = JSON.parse(localStorage.getItem('productos'));
    var imgUrl = [];
    var productKeys = Object.keys(db.productos);
    productKeys.map((key) => {
        let subProd = Object.keys(db.productos[key]);
        subProd.map((sub) => {
            if (db.productos[key][sub].img) {
                let item = new Image(key, sub, path + db.productos[key][sub].img.split('/').join('%2F') + token)
                imgUrl.push(item);
            }
        })
    });
    let ref = new Image('Bebidas', 'Refrescos', path + 'img%2Fref%2Fref-min.jpg' + token);
    imgUrl.push(ref);
    let zum = new Image('Bebidas', 'Zumos', path + 'img%2Fzum%2Fzum-min.jpg' + token);
    imgUrl.push(zum);

    productKeys.map((p) => {
        let c = false;
        for (let i = 0; i < imgUrl.length; i++) {
            if (imgUrl[i].category === p && !c) {
                $('.owl-carousel').append(`<div class="item">
                                            <div class="row">
                                                <div class="col-md-7">
                                                    <a href="pages/productos.html"><img src="${imgUrl[i].path}" alt="" class="img-fluid"></a>
                                                </div>
                                                <div class="col-md-5">
                                                    <h1>${imgUrl[i].category}</h1>
                                                </div>
                                            </div>
                                        </div>`);
                c = true;
            }
        }
    });
    subProd.map((sub) => {
        for (let i = 0; i < imgUrl.length; i++) {
            // if(db.productos.Bocadillos[sub]
            $('.products').append(`<div class="col-lg-3 col-md-4">
                                    <div class="product">
                                        <div class="image">
                                            <a href="shop-detail.html">
                                                <img src="../img/product1.jpg" alt="" class="../img-fluid image1">
                                            </a>
                                        </div>
                                        <div class="text">
                                            <h3 class="h5">
                                                <a href="shop-detail.html">Fur coat with very but very very long name</a>
                                            </h3>
                                            <p class="price">$143.00</p>
                                        </div>
                                    </div>
                                </div>`);
        }
    });

    /**
     * Load the database from firebase
     */
    function loadData() {
        var ref = firebase.database().ref();

        ref.on("value", function (snapshot) {
            localStorage.setItem('productos', JSON.stringify(snapshot.val()));
        }, function (error) {
            console.log("Error: " + error.code);
        });
    }
    // showImage('img/boc/boc1.jpg')
    /**
     * Get the full image url from firebase
     * @param {String} img 
     */
    function showImage(img) {
        var storageRef = firebase.storage().ref();
        var spaceRef = storageRef.child(img);
        storageRef.child(img).getDownloadURL().then(function (url) {
            var test = url;
            alert(url);
            console.log(test);
        }).catch(function (error) {
        });
    }
});