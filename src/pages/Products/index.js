import { Button, Form, Input, Modal, Space, Table, message } from 'antd'
import './style.css'
import { useEffect, useState } from 'react'
import API from '../../api';
import { NewProduct } from './NewProduct';
import { useForm } from 'antd/es/form/Form';



export const Products = () => {
    const [products, setProducts] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([])
    const [form] = useForm()


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
        },
        {
            title: 'Veprime',
            dataIndex: 'operation',
            key: 'operation',
            render: (_, record) => {
                return (
                    <Space size="middle">
                        <a onClick={() => showModal(record._id)}>Edit</a>
                        <a onClick={() => API.delete(`products/product/${record._id}`).then(() => {
                            setProducts((res) => res.filter((e) => e._id !== record._id))
                            setFilteredProducts((res) => res.filter((e) => e._id !== record._id))
                        }).catch(() => message.warning('Dicka shkoi keq'))}>Delete</a>
                    </Space>
                )
            },
        },
    ];
    const showModal = (id) => {
        setIsModalOpen({ visible: true, id });
    };

    const handleOk = () => {
        form.validateFields().then(() => {
            if (isModalOpen?.id) {
                API.put(`products/product/${isModalOpen?.id}`, form.getFieldsValue()).then((res) => {
                    setProducts((rest) => [...rest.filter((el) => el._id !== isModalOpen?.id), res])
                    setFilteredProducts((rest) => [...rest.filter((el) => el._id !== isModalOpen?.id), res])
                    form.resetFields()
                    setIsModalOpen(false);
                }).catch((e) => message.warning('Dicka shkoi keq'))
            } else {
                API.post('products/product', form.getFieldsValue()).then((res) => {
                    setProducts((rest) => [res, ...rest])
                    setFilteredProducts((rest) => [res, ...rest])
                    form.resetFields()
                    setIsModalOpen(false);
                }).catch((e) => message.warning('Dicka shkoi keq'))
            }

        }).catch((e) => { })
    };

    const handleCancel = () => {
        form.resetFields()
        setIsModalOpen(false);
    };
    const filterProducts = (e) => {
    }
    useEffect(() => {
        API.get('products/products').then((res) => {
            setProducts(res)
            setFilteredProducts(res)
        }).catch(() => message.warning('Dicka shkoi keq'))
    }, [])
    return <>
        <div className='products-container'>
            <div className='products-container-actions'>
                <Input onChange={filterProducts} placeholder='Kerko nga barcodi ose nga emri' />
                <Button onClick={() => showModal()}>Shto Produkt</Button>
            </div>
            <div className='products-container-table'>
                <Table pagination={false} dataSource={filteredProducts} columns={columns} />
            </div>
        </div>
        <Modal title="Shto Produkt" open={isModalOpen?.visible} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form}>
                <NewProduct />
            </Form>
        </Modal>
    </>
}

export * from './NewProduct'