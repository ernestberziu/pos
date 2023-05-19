import { Input, InputNumber, Table, message } from 'antd'
import './style.css'
import { useEffect, useState } from 'react';
import API from '../../api';

export const NewOrder = () => {
    const [currentOrder, setCurrentOrder] = useState([{ barcode: '99', name: 'malboro', quantity: 1, price: 100, total: 100 }])
    const [products, setProducts] = useState([])
    const [value, setValue] = useState('')
    const columns = [
        {
            title: 'Barcode',
            dataIndex: 'barcode',
            key: 'barcode',
        },
        {
            title: 'Produkti',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Sasia',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record, index) => (
                <InputNumber value={text} onChange={onInputChange("quantity", index)} />
            )
        },
        {
            title: 'Cmimi',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (text, record, index) => {
                return (record.quantity * record.price) || 0
            }
        },
    ];

    const onInputChange = (key, index) => (e) => {
        const newData = [...currentOrder];
        newData[index][key] = Number(e);
        setCurrentOrder(newData);
    };

    const addToCardBySearch = (el) => {
        const selectedProduct = products?.find((e) => e?.barcode?.toString() === el.clipboardData.getData('Text').toString())
        if (selectedProduct) {
            const existedProduct = currentOrder?.find((e) => e.barcode === selectedProduct.barcode)
            if (existedProduct) {
                setCurrentOrder((prev) => [{ ...existedProduct, quantity: existedProduct.quantity + 1 }, ...prev.filter((e) => e.barcode !== existedProduct.barcode)])
                setValue('')
            } else {
                setCurrentOrder((prev) => [...prev, { ...selectedProduct, quantity: 1 }])
                setValue('')
            }
        }
    }

    const addToCardBySearchEnter = () => {
        const selectedProduct = products?.find((e) => e?.barcode?.toString() === value)
        if (selectedProduct) {
            const existedProduct = currentOrder?.find((e) => e.barcode === selectedProduct.barcode)
            if (existedProduct) {
                setCurrentOrder((prev) => [{ ...existedProduct, quantity: existedProduct.quantity + 1 }, ...prev.filter((e) => e.barcode !== existedProduct.barcode)])
                setValue('')
            } else {
                setCurrentOrder((prev) => [...prev, { ...selectedProduct, quantity: 1 }])
                setValue('')
            }
        }
    }

    useEffect(() => {
        API.get('products/products').then(setProducts).catch(() => message.warning('Dicka shkoi keq'))
    }, [])

    return <div className="new-order-container">
        <div className='new-order-container-order-form'>
            <Input value={value} onChange={(e) => setValue(e.target.value)} onPressEnter={addToCardBySearchEnter} onPaste={addToCardBySearch} placeholder='Vendosni barcodin' />
            <Table pagination={false} dataSource={currentOrder} columns={columns} />;
        </div>
        <div className='new-order-container-products'>
            <div className='new-order-container-products-search'>
                <Input placeholder='Kerkoni me barcode ose me emer' />
            </div>
            <div className='new-order-container-products-catalog'>
                {products.map((e, key) => {
                    return (
                        <div key={key} className='new-order-container-product'>
                            <span>
                                Produkti: {e.name}
                            </span>
                            <span>
                                Cmimi: {e.price}
                            </span>
                            <span>
                                Sasia: {e.quantity}
                            </span>
                        </div>)
                })}
            </div>
        </div>
    </div>
}