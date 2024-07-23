import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, Divider, Typography, Box } from '@mui/material';

const Articles = () => {
    const [list, setList] = useState([]);

    const callAPI = async () => {
        try {
            const res = await axios.get("/crawl/hkbs");
            setList(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        callAPI();
    }, []);

    return (
        <div className='mt-5'>
            <Box
                sx={{
                    padding: '16px',
                    marginBottom: '16px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        fontWeight: 'bold',
                        color: '#333',
                        textAlign: 'center',
                    }}
                >
                    환경 주요 뉴스
                </Typography>
            </Box>
            <List>
                {list.map((art, index) => (
                    <div key={index}>
                        <ListItem button component="a" href={art.link}>
                            <Typography variant="body2" style={{ fontSize: '0.75rem' }}>
                                {art.title}
                            </Typography>
                        </ListItem>
                        <Divider />
                    </div>
                ))}
            </List>
        </div>
    );
};

export default Articles;
