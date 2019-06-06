const factory = require("../factories");

describe("Categories", () => {
  it("xesq", async () => {
   

    expect(200).toBe(200);
  });
});


/*
 for (let index = 0; index < 10; index++) {
      if (index % 2 == 0) {
        console.log("if");
        let qtd = Math.floor(Math.random() * 5) + 1;

        for (let index2 = 0; index2 < qtd; index2++) {
          let cate = await factory.create("Category");
          console.log(cate.id);
          let prod = await factory.create("Product", {
            categoryId: cate.id,
            categoryMainId: index2 === 5 && 1
          });
          console.log(prod.id);
          let prodD = await factory.create("ProductDetail", {
            productId: prod.id
          });
        }
      } else {
        console.log("else");
        let cate = await factory.create("Category");
        console.log(cate.id);
        let prod = await factory.create("Product", {
          categoryId: cate.id
        });
        console.log(prod.id);
        let prodD = await factory.create("ProductDetail", {
          productId: prod.id
        });
      }
    }
*/