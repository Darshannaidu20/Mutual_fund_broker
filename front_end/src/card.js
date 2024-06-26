// import React, { useState } from 'react';
// import './Card.css';
// import { Grid, Card } from '@mui/material';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';

// const CardPage = () => {
//     const [selectedTags, setSelectedTags] = useState(new Set());

//     const toggleTag = (tag) => {
//         const newSelectedTags = new Set(selectedTags);
//         if (newSelectedTags.has(tag)) {
//             newSelectedTags.delete(tag);
//         } else {
//             newSelectedTags.add(tag);
//         }
//         setSelectedTags(newSelectedTags);
//     };

//     const tags = ["Experience", "Quality", "Design", "Size", "Features", "Value", "Replacement"];

//     return (
//         <>
//             <Grid className="title">Reviews</Grid>
//             <Grid className="reviews-list" Container spacing={3} p={3}>
//                 <Grid sm={4}>
//                     <Card sx={{ maxWidth: 345 }}>
//                         <CardActionArea>
//                             <CardMedia
//                                 component="img"
//                                 height="140"
//                                 image="/static/images/cards/contemplative-reptile.jpg"
//                                 alt="green iguana"
//                             />
//                             <CardContent>
//                                 <Typography gutterBottom variant="h5" component="div">
//                                     Lizard
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     Lizards are a widespread group of squamate reptiles, with over 6,000
//                                     species, ranging across all continents except Antarctica
//                                 </Typography>
//                             </CardContent>
//                         </CardActionArea>
//                     </Card>
//                   </Grid>
//                   <Grid sm={4}>
//                     <Card sx={{ maxWidth: 345 }}>
//                         <CardActionArea>
//                             <CardMedia
//                                 component="img"
//                                 height="140"
//                                 image="/static/images/cards/contemplative-reptile.jpg"
//                                 alt="green iguana"
//                             />
//                             <CardContent>
//                                 <Typography gutterBottom variant="h5" component="div">
//                                     Lizard
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     Lizards are a widespread group of squamate reptiles, with over 6,000
//                                     species, ranging across all continents except Antarctica
//                                 </Typography>
//                             </CardContent>
//                         </CardActionArea>
//                     </Card>
//                   </Grid>
//                   <Grid sm={4}>
//                     <Card sx={{ maxWidth: 345 }}>
//                         <CardActionArea>
//                             <CardMedia
//                                 component="img"
//                                 height="140"
//                                 image="/static/images/cards/contemplative-reptile.jpg"
//                                 alt="green iguana"
//                             />
//                             <CardContent>
//                                 <Typography gutterBottom variant="h5" component="div">
//                                     Lizard
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     Lizards are a widespread group of squamate reptiles, with over 6,000
//                                     species, ranging across all continents except Antarctica
//                                 </Typography>
//                             </CardContent>
//                         </CardActionArea>
//                     </Card>
//                   </Grid>
//             </Grid>
//         </>
//     );
// };

// export default CardPage;
import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';

const CardPage = () => {
    const [selectedTags, setSelectedTags] = useState(new Set());

    const toggleTag = (tag) => {
        const newSelectedTags = new Set(selectedTags);
        if (newSelectedTags.has(tag)) {
            newSelectedTags.delete(tag);
        } else {
            newSelectedTags.add(tag);
        }
        setSelectedTags(newSelectedTags);
    };

    const tags = ["Experience", "Quality", "Design", "Size", "Features", "Value", "Replacement"];

    return (
        <>
            
            <Grid className="reviews-list" container spacing={3} p={3}>
                <Grid item sm={4}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/1.jpg"
                                alt="Review Image 1"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                Mutual Funds
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                Discover expertly managed mutual funds tailored to your financial goals. 
                                Whether you're a seasoned investor or just starting, we have the perfect solution for you.
                                Discover expertly managed mutual funds tailored to your financial goals. 
                                Whether you're a seasoned investor or just starting,
                                
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item sm={4}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/2.jpg"
                                alt="Review Image 2"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                How to Invest
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                

                                Open an Account: Sign up online or contact us.
                                Choose Your Funds: Select based on your goals.
                                Make an Investment: Fund your account.Discover expertly managed mutual funds tailored to your financial goals. 
                                Whether you're a seasoned investor or just starting,we have the perfect solution for you.
                                
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item sm={4}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/3.jpg"
                                alt="Review Image 3"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                What Our Clients Say
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                
                                Read testimonials from satisfied investors who have achieved their financial goals with our mutual funds. We take pride in exceptional service and lasting relationships.
                                These concise descriptions will fit well in cards on your website, providing a clear and engaging summary of each section.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default CardPage;

