$(() => {
    Image = function (category, type, path) {
        this.category = category;
        this.type = type;
        this.path = path;
    }

    loadData();
    var path = '../';//'https://firebasestorage.googleapis.com/v0/b/coffeeapp-171e9.appspot.com/o/';
    var token = '';//'?alt=media&token=b89c44db-789c-4946-944e-68019da9ee8d';
    var db = JSON.parse(localStorage.getItem('productos'));
    var imgUrl = [];
    var productKeys = Object.keys(db.productos);
    var subProd;
    productKeys.map((key) => {
        subProd = Object.keys(db.productos[key]);
        subProd.map((sub) => {
            if (db.productos[key][sub].img) {
                let item = new Image(key, sub, db.productos[key][sub].img)
                imgUrl.push(item);
            }
        })
    });
    let ref = new Image('Bebidas', 'Refrescos', 'img/ref/ref-min.jpg');
    imgUrl.push(ref);
    let zum = new Image('Bebidas', 'Zumos', 'img/zum/zum-min.jpg');
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
    // subProd.map((sub) => {
        for (let i = 0; i < imgUrl.length; i++) {
            // if(db.productos.Bocadillos[sub]
            if (imgUrl[i].category === 'Bocadillos') {
                $('.products').append(`<div class="col-lg-3 col-md-4">
                                    <div class="product">
                                        <div class="image">
                                            <a href="shop-detail.html">
                                                <img src="${path + imgUrl[i].path}" alt="" class="img-fluid image1">
                                            </a>
                                        </div>
                                        <div class="text">
                                            <h3 class="h5 mb-0">${db.productos.Bocadillos[imgUrl[i].type].name}</h3>
                                            <p class="price">${db.productos.Bocadillos[imgUrl[i].type].price} €</p>
                                        </div>
                                    </div>
                                </div>`);
            }
        }
    // });

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