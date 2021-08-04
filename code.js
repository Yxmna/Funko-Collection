const link = "https://spreadsheets.google.com/feeds/list/1QMNOMyanLvv3HRA4PLU9oFRl3Jc1p9e0KLfQvg8yk80/1/public/values?alt=json"
var db;

fetch(link)
  .then(function(res) {
    return res.json();
  })
  .then(function(obj) {
    db = obj.feed.entry;
    db = db.filter(function(a) {
      return a.gsx$name.$t != "";
    });
    Object.keys(db).forEach((pop, i) => {

      Object.keys(db[pop]).forEach((key, i) => {

        if (key.startsWith("gsx$")) {
          db[pop][key.split("$")[1]] = db[pop][key].$t;
        }

        delete db[pop][key];

      });


    });

    all_collection = db.map(element => element.collection)
    all_collection = all_collection.filter((c, index) => {
      return all_collection.indexOf(c) === index;
    });

    all_collection.forEach((collection, i) => {


      let article = document.createElement("article");
      let collection_title = document.createElement("h1");
      let ul = document.createElement("ul");



      let current_collection = db.filter(element => element.collection == collection);

      let percent = current_collection.map(element => element.get).reduce((x, y) => Math.floor(x) + Math.floor(y));
      let total = current_collection.length;


      collection_title.innerHTML = collection + "  " + percent + "/" + total;


      current_collection.forEach((pop, i) => {


        let pop_title = document.createElement("h2");
        let pop_detail = document.createElement("h3");
        let img = document.createElement("img");
        let link = document.createElement("a");
        let li = document.createElement("li");

        if (pop.get == 1) {
          pop_title.innerHTML = pop.name + " ✅";
        } else {
          pop_title.innerHTML = pop.name + " • " + pop.price;
        }
        pop_detail.innerHTML = pop.where + " • " + pop.number;
        img.src = pop.img;
        link.href = pop.link;

        if (pop.get == 1) li.classList.add("house");

        link.appendChild(img);
        li.appendChild(link);
        li.appendChild(pop_title);
        li.appendChild(pop_detail);
        ul.appendChild(li);

      });


      article.appendChild(collection_title);
      article.appendChild(ul);


      document.getElementById("body").appendChild(article);

    });




  });
