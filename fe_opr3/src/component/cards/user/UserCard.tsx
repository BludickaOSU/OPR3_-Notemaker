import React from 'react';
import {UserDTO} from "../../../model/user/UserDTO";
import {Box, Card, CardContent, Container, Typography} from "@mui/material";


interface UserCardProps {
    user: UserDTO;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
    return(
        <Container>
            <Card>
                <CardContent>
                    <Box sx={{display: "flex", flexDirection: "row", alignItems:"center"}}>
                        <Typography variant="h6" component="p">
                            {user.firstName}{user.lastName}
                        </Typography>
                        <Typography variant="h6" component={"p"}>
                            |
                        </Typography>
                        <Typography variant={"h6"} component={"p"}>
                            {user.email}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    )
}

