// // src/components/TopBar/index.jsx
// import React, { useEffect, useState } from 'react';
// import { AppBar, Toolbar, Typography } from '@mui/material';
// import { useLocation, useParams } from 'react-router-dom';
// import models from '../../modelData/models';

// export default function TopBar() {
//   const location = useLocation();
//   const { userId } = useParams();
//   const [context, setContext] = useState('');

//   useEffect(() => {
//     if (location.pathname === '/users') {
//       setContext('Danh sách người dùng');
//     } else if (location.pathname.startsWith('/users/') && userId) {
//       const user = models.userModel(userId);
//       setContext(user ? `${user.first_name} ${user.last_name}` : 'Chi tiết người dùng');
//     } else if (location.pathname.startsWith('/photos/') && userId) {
//       const user = models.userModel(userId);
//       setContext(user ? `Ảnh của ${user.first_name} ${user.last_name}` : 'Ảnh người dùng');
//     }
//   }, [location, userId]);

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" style={{ flexGrow: 1 }}>
//           [Đinh Xuân Bách]
//         </Typography>
//         <Typography variant="h6">{context}</Typography>
//       </Toolbar>
//     </AppBar>
//   );
// }
// src/components/TopBar/index.jsx
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import fetchModel from '../../lib/fetchModelData';

export default function TopBar() {
  const location = useLocation();
  const { userId } = useParams();
  const [context, setContext] = useState('');

  useEffect(() => {
    if (location.pathname === '/users') {
      setContext('Danh sách người dùng');
    } else if (location.pathname.startsWith('/users/') && userId) {
      fetchModel(`/user/${userId}`).then((user) => {
        setContext(user ? `${user.first_name} ${user.last_name}` : 'Chi tiết người dùng');
      });
    } else if (location.pathname.startsWith('/photos/') && userId) {
      fetchModel(`/user/${userId}`).then((user) => {
        setContext(user ? `Ảnh của ${user.first_name} ${user.last_name}` : 'Ảnh người dùng');
      });
    }
  }, [location, userId]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          [Đinh Xuân Bách]
        </Typography>
        <Typography variant="h6">{context}</Typography>
      </Toolbar>
    </AppBar>
  );
}