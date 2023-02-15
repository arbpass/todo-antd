import React from 'react'
import './Todo.css'
import { useState } from 'react';
import { Form, Input, Button, Table, Typography, Select, DatePicker, Modal } from 'antd';
import { CaretRightOutlined, DeleteFilled, DeleteOutlined, EditFilled, EditOutlined, StarTwoTone } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';

const Home = () => {
    const { Title, Text } = Typography;
    const { Option } = Select;
    const [form] = Form.useForm();
    const dateFormat = 'YYYY/MM/DD';

    //States
    const [isEditing, setIsEditing] = useState(false);
    const [todoEdit, setTodoEdit] = useState(null);
    const [searchText, setSearchText] = useState("");

    const [dataSource, setDataSource] = useState([
        {
            id: 1,
            title: 'Sample',
            description: 'This is a description',
            due_date: '2023-02-15',
            status: 'OPEN',
            tags: [' Work'],
            timestamp: Date.now(),
        },
    ]);


    //Defined columns for the table
    const columns = [
        {
            key: '1',
            title: 'ID',
            dataIndex: 'id',
            sorter: (record1, record2) => {
                return record1.id > record2.id;
            },

        },
        {
            key: '2',
            title: 'Timestamp',
            dataIndex: 'timestamp',
            sorter: (record1, record2) => {
                return record1.timestamp > record2.timestamp;
            }
        },
        {
            key: '3',
            title: 'Title',
            dataIndex: 'title',
            sorter: (record1, record2) => {
                return record1.title > record2.title;
            },
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return String(record.title).toLowerCase().includes(value.toLowerCase()) || String(record.description).toLowerCase().includes(value.toLowerCase()) || String(record.tags).toLowerCase().includes(value.toLowerCase()) || String(record.status).toLowerCase().includes(value.toLowerCase()) || String(record.due_date).toLowerCase().includes(value.toLowerCase()) || String(record.id).toLowerCase().includes(value.toLowerCase()) || String(record.timestamp).toLowerCase().includes(value.toLowerCase());
            }
        },
        {
            key: '4',
            title: 'Description',
            dataIndex: 'description',
            sorter: (record1, record2) => {
                return record1.description > record2.description;
            },
            width: 300
        },
        {
            key: '5',
            title: 'Due Date',
            dataIndex: 'due_date',
            sorter: (record1, record2) => {
                return record1.id > record2.id;
            }
        },
        {
            key: '6',
            title: 'Tags',
            dataIndex: 'tags',
            filters: [
                { text: 'Work', value: 'Work' },
                { text: 'Household', value: 'Household' },
                { text: 'Study', value: 'Study' },
                { text: 'Sport', value: 'Sport' },
                { text: 'Market', value: 'Market' },
                { text: 'Shopping', value: 'Shopping' },
                { text: 'Exercise', value: 'Exercise' },
                { text: 'Shower', value: 'Shower' },
                { text: 'Normal', value: 'Normal' },
            ],
            onFilter: (value, record) => {
                let answer = record.tags.toString().includes(value);
                return answer;
            }
        },
        {
            key: '7',
            title: 'Status',
            dataIndex: 'status',
            filters: [
                { text: 'OPEN', value: 'OPEN' },
                { text: 'DONE', value: 'DONE' },
                { text: 'WORKING', value: 'WORKING' },
                { text: 'OVERDUE', value: 'OVERDUE' },
            ],
            onFilter: (value, record) => {
                return record.status === value;
            }
        },
        {
            key: '8',
            title: 'Actions',
            render: (record) => {
                return (
                    <>
                        <EditOutlined onClick={() => onEdit(record)} style={{ color: 'green' }} />
                        <DeleteOutlined onClick={() => onDelete(record)} style={{ color: 'red', marginLeft: 20 }} />
                    </>
                )
            }
        }
    ]



    //Tags (logic for adding tags)
    const children = [];
    const tagsOptions = [' Work', ' Household', ' Study', ' Sport', ' Market', ' Shopping', ' Exercise', ' Shower', ' Normal'];
    tagsOptions.forEach(element => {
        children.push(<Option key={element}>{element}</Option>);
    });


    //Deleting (logic for deleting the todo)
    function onDelete(element) {
        Modal.confirm({
            title: 'Are you sure to Delete this Todo?',
            onOk: () => {
                setDataSource((pre) => {
                    return pre.filter((dataSource) => dataSource.id !== element.id);
                });
            }
        })
    }


    //Edit the todo
    function onEdit(element) {
        setIsEditing(true);
        setTodoEdit({ ...element });
    }
    function resetEdit(element) {
        setIsEditing(false);
        setTodoEdit(null);
    }



    //Craeting new todo (on submitting the form)
    function onSubmit(element) {

        let tag = element.tags === undefined ? "" : element.tags + '';
        const newData = {
            id: dataSource.length + 1,
            title: element.title,
            description: element.description,
            due_date: JSON.stringify(element.due_date.$d).slice(1, 11),
            status: element.status,
            tags: tag,
            timestamp: Date.now(),
        }

        setDataSource(pre => {
            return [...pre, newData]
        })
        form.resetFields();
    }

    
    return (
        <>
            <div className='App'>
                <Title>Todo App</Title><Title level={4}>Using Ant Design</Title>
                <header className='container'>
                    <Form form={form} onFinish={onSubmit}>
                        <Form.Item name='title'>
                            <Input style={{width: 400}} placeholder='Title*' required maxLength={100}></Input>
                        </Form.Item>
                        <Form.Item name='description'>
                            <TextArea style={{width: 400}} placeholder='Description*' required maxLength={1000}></TextArea>
                        </Form.Item>
                        <Form.Item name='due_date'>
                            <DatePicker style={{ width: 400 }} placeholder='Due Date*' required />
                        </Form.Item>
                        <Form.Item name='status'>
                            <Select
                                style={{ width: 400, textAlign: 'left'}}
                                placeholder="Status"
                                optionFilterProp="children"
                                
                            >
                                <Option value="OPEN">OPEN</Option>
                                <Option value="WORKING">WORKING</Option>
                                <Option value="DONE">DONE</Option>
                                <Option value="OVERDUE">OVERDUE</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name='tags'>
                            <Select
                                mode="multiple"
                                style={{ width: 400, textAlign: 'left' }}
                                placeholder="Tags"
                                defaultValue={[]}
                            >
                                {children}
                            </Select>
                        </Form.Item>
                        <Text type="warning"> * Mandatory Fields</Text>

                        <Form.Item>
                            <Button style={{width: 100}} htmlType='submit' type='primary'>Add Todo</Button>
                        </Form.Item>
                    </Form>
                </header>
            </div>



            <div className='App'>
                <header className='container'>
                    <Input.Search
                        placeholder='Search...'
                        style={{ width: 300, marginBottom: 10 }}
                        onSearch={(value) => {
                            setSearchText(value);
                        }}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                    <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 15 }}></Table>
                    <Modal
                        title='Edit Todo'
                        open={isEditing}
                        okText='Save'
                        onCancel={() => resetEdit()}
                        onOk={() => {
                            setDataSource(pre => {
                                return pre.map(ele => {
                                    if (ele.id === todoEdit.id) {

                                        return todoEdit;
                                    }
                                    else {
                                        return ele;
                                    }
                                })
                            })
                            resetEdit()
                        }}
                    >
                        <Input value={todoEdit?.title} required onChange={(e) => {
                            setTodoEdit(pre => {
                                return { ...pre, title: e.target.value }
                            })
                        }} />
                        <TextArea value={todoEdit?.description} required onChange={(e) => {
                            setTodoEdit(pre => {
                                return { ...pre, description: e.target.value }
                            })
                        }}></TextArea>
                        <DatePicker style={{ width: 200 }} defaultValue={dayjs(todoEdit?.due_date, dateFormat)} required
                            onChange={(e) => {
                                setTodoEdit(pre => {
                                    return { ...pre, due_date: JSON.stringify(e).slice(1, 11) }
                                })
                            }} />
                        <Select
                            style={{ width: 200 }}
                            defaultValue={todoEdit?.status}
                            optionFilterProp="children"
                            onChange={(e) => {
                                setTodoEdit(pre => {
                                    return { ...pre, status: e }
                                })
                            }}
                        >
                            <Option value="OPEN">OPEN</Option>
                            <Option value="WORKING">WORKING</Option>
                            <Option value="DONE">DONE</Option>
                            <Option value="OVERDUE">OVERDUE</Option>
                        </Select>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            defaultValue={todoEdit?.tags}
                            onChange={(e) => {
                                setTodoEdit(pre => {
                                    return { ...pre, tags: e }
                                })
                            }}
                        >
                            {children}
                        </Select>
                    </Modal>
                </header>
            </div>

        </>
    )
}

export default Home