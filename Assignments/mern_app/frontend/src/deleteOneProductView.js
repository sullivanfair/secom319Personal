import { useState } from "react";

const DeleteOneProductView = ({product, getAllProducts}) => {
    const [index, setIndex] = useState(0)

    function getOneByOneProductNext() {
        if (product.length > 0) {
            if (index === product.length - 1) setIndex(0);
            else setIndex(index + 1);
        }
    }
    function getOneByOneProductPrev() {
        if (product.length > 0) {
            if (index === 0) setIndex(product.length - 1);
            else setIndex(index - 1);

        }
    }
    function deleteOneProduct(deleteid) {
        console.log("Product to delete :", deleteid);
        fetch("http://localhost:8081/deleteProduct/" + deleteid, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({"id":deleteid}),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Delete a product completed : ", deleteid);
            console.log(data);
            if (data) {
                const key = Object.keys(data);
                const value = Object.values(data);
                alert(key+value);
            }
        });
        getAllProducts();
    }

    return (
        <>
            <h3>Delete one product:</h3>
        
            <button onClick={() => getOneByOneProductPrev()}>Prev</button>
            <button onClick={() => getOneByOneProductNext()}>Next</button>
            <button onClick={() => deleteOneProduct(product[index].id)}>
                Delete
            </button>
            <div key={product[index].id}>
                <img src={product[index].image} width={30} /> <br />
                Id:{product[index].id} <br />
                Title: {product[index].title} <br />
                Category: {product[index].category} <br />
                Price: {product[index].price} <br />
                Rating :{product[index].rating.rate}, {product[index].rating.count} <br />
            </div>
            
        </>
        );
};

export default DeleteOneProductView;