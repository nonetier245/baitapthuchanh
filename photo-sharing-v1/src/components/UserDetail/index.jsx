// // src/components/UserDetail/index.jsx
// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Card, CardContent, Typography, Button } from '@mui/material';
// import models from '../../modelData/models';

// export default function UserDetail() {
//   const { userId } = useParams();
//   const user = models.userModel(userId);

//   if (!user) {
//     return <Typography>Không tìm thấy người dùng</Typography>;
//   }

//   return (
//     <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
//       <CardContent>
//         <Typography variant="h5" gutterBottom>
//           {`${user.first_name} ${user.last_name}`}
//         </Typography>
//         <Typography variant="body1">
//           <strong>Địa điểm:</strong> {user.location}
//         </Typography>
//         <Typography variant="body1">
//           <strong>Mô tả:</strong> {user.description}
//         </Typography>
//         <Typography variant="body1">
//           <strong>Nghề nghiệp:</strong> {user.occupation}
//         </Typography>
//         <Button
//           component={Link}
//           to={`/photos/${userId}`}
//           variant="contained"
//           color="primary"
//           sx={{ marginTop: 2 }}
//         >
//           Xem ảnh
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }
// src/components/UserDetail/index.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';
import fetchModel from '../../lib/fetchModelData';

export default function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchModel(`/user/${userId}`).then((data) => {
      if (data) setUser(data);
    });
  }, [userId]);

  if (!user) {
    return <Typography>Đang tải...</Typography>;
  }

  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {`${user.first_name} ${user.last_name}`}
        </Typography>
        <Typography variant="body1">
          <strong>Địa điểm:</strong> {user.location}
        </Typography>
        <Typography variant="body1">
          <strong>Mô tả:</strong> {user.description}
        </Typography>
        <Typography variant="body1">
          <strong>Nghề nghiệp:</strong> {user.occupation}
        </Typography>
        <Button
          component={Link}
          to={`/photos/${userId}`}
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Xem ảnh
        </Button>
      </CardContent>
    </Card>
  );
}