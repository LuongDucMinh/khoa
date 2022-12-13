import React, { Component } from 'react'

export const DataContext = React.createContext();

export class DataProvider extends Component {

    state = {
        products: [
            {
                "_id": "1",
                "title": "Nike Shoes 01",
                "src": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/dc9efa13-9572-490e-afa9-4c5b8e25187a/air-jordan-1-mid-se-shoes-pZbfP8.png",
                "description": "Jordan 1 KO",
                "price": 23,
                "colors": ["red", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "2",
                "title": "Nike Shoes 02",
                "src": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4869366e-b186-46f8-b148-d81c7b2ef77e/air-jordan-xxxvii-pf-basketball-shoes-rthNXn.png",
                "description": "Air Jordan 6 Retro",
                "content": "",
                "price": 19,
                "colors": ["red", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "3",
                "title": "Nike Shoes 03",
                "src": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3b5fc6f3-9d2f-4fe9-9f8a-4b746e4ded80/air-jordan-xxxvii-pf-basketball-shoes-rthNXn.png",
                "description": "Air Jordan Mid",
                "content": "",
                "price": 50,
                "colors": ["lightblue", "white", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "4",
                "title": "Nike Shoes 04",
                "src": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/7e0119a8-d771-4801-a99e-848f7ad69665/air-jordan-xxxvii-pf-basketball-shoes-FxrCGw.png",
                "description": "Air Jordan Mid SE",
                "content": "",
                "price": 15,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "5",
                "title": "Nike Shoes 05",
                "src": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/6a412738-c878-43a3-af4d-a372c6291563/air-jordan-6-retro-shoes-4m3b9d.png",
                "description": "Air Jordan Mid XVII",
                "content": " ",
                "price": 10,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "6",
                "title": "Nike Shoes 06",
                "src": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fb4da480-42e2-4daa-b75c-dc88e719e9e4/jumpman-two-trey-shoes-rhmBzG.png",
                "description": "Air Jordan Zoom 1 CAMF",
                "content": " ",
                "price": 17,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            }
        ],
        cart: [],
        total: 0
        
    };

    addCart = (id) =>{
        const {products, cart} = this.state;
        const check = cart.every(item =>{
            return item._id !== id
        })
        if(check){
            const data = products.filter(product =>{
                return product._id === id
            })
            this.setState({cart: [...cart,...data]})
        }else{
            alert("The product has been added to cart.")
        }
    };

    reduction = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count === 1 ? item.count = 1 : item.count -=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    increase = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count += 1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            const {cart} = this.state;
            cart.forEach((item, index) =>{
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })
            this.setState({cart: cart});
            this.getTotal();
        }
       
    };

    getTotal = ()=>{
        const{cart} = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.count);
        },0)
        this.setState({total: res})
    };
    
    componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    };

    componentDidMount(){
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if(dataCart !== null){
            this.setState({cart: dataCart});
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if(dataTotal !== null){
            this.setState({total: dataTotal});
        }
    }
   

    render() {
        const {products, cart,total} = this.state;
        const {addCart,reduction,increase,removeProduct,getTotal} = this;
        return (
            <DataContext.Provider 
            value={{products, addCart, cart, reduction,increase,removeProduct,total,getTotal}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}


