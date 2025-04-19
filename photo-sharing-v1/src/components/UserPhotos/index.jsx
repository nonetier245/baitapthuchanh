// src/components/UserPhotos/index.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  ButtonGroup,
} from '@mui/material';
import fetchModel from '../../lib/fetchModelData';

export default function UserPhotos({ advancedFeatures }) {
  const { userId, photoId } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    fetchModel(`/photosOfUser/${userId}`).then((data) => {
      if (data) {
        setPhotos(data);
        if (photoId) {
          const index = data.findIndex((photo) => photo._id === photoId);
          if (index !== -1) setCurrentPhotoIndex(index);
        }
      }
    });
  }, [userId, photoId]);

  const handlePrevious = () => {
    if (currentPhotoIndex > 0) {
      const newIndex = currentPhotoIndex - 1;
      setCurrentPhotoIndex(newIndex);
      navigate(`/photos/${userId}/${photos[newIndex]._id}`);
    }
  };

  const handleNext = () => {
    if (currentPhotoIndex < photos.length - 1) {
      const newIndex = currentPhotoIndex + 1;
      setCurrentPhotoIndex(newIndex);
      navigate(`/photos/${userId}/${photos[newIndex]._id}`);
    }
  };

  if (!photos || photos.length === 0) {
    return <Typography>Không tìm thấy ảnh</Typography>;
  }

  if (advancedFeatures) {
    const photo = photos[currentPhotoIndex];
    return (
      <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
        <CardMedia
          component="img"
          height="400"
          image={`/images/${photo.file_name}`}
          alt="Ảnh người dùng"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <strong>Đăng vào:</strong> {new Date(photo.date_time).toLocaleString('vi-VN')}
          </Typography>
          <ButtonGroup sx={{ marginY: 2 }}>
            <Button
              onClick={handlePrevious}
              disabled={currentPhotoIndex === 0}
              variant="contained"
            >
              Trước
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentPhotoIndex === photos.length - 1}
              variant="contained"
            >
              Tiếp
            </Button>
          </ButtonGroup>
          <Typography variant="h6">Bình luận:</Typography>
          <List>
            {photo.comments.length === 0 ? (
              <Typography>Chưa có bình luận</Typography>
            ) : (
              photo.comments.map((comment) => (
                <ListItem key={comment._id} disablePadding>
                  <ListItemText
                    primary={
                      <>
                        <Link to={`/users/${comment.user._id}`}>
                          {`${comment.user.first_name} ${comment.user.last_name}`}
                        </Link>
                        : {comment.comment}
                      </>
                    }
                    secondary={new Date(comment.date_time).toLocaleString('vi-VN')}
                  />
                </ListItem>
              ))
            )}
          </List>
        </CardContent>
      </Card>
    );
  }

  // Chế độ mặc định: hiển thị tất cả ảnh
  return (
    <div style={{ padding: '20px' }}>
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ marginBottom: 3 }}>
          <CardMedia
            component="img"
            height="200"
            image={`/images/${photo.file_name}`}
            alt="Ảnh người dùng"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <strong>Đăng vào:</strong> {new Date(photo.date_time).toLocaleString('vi-VN')}
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 1 }}>
              Bình luận:
            </Typography>
            <List>
              {photo.comments.length === 0 ? (
                <Typography>Chưa có bình luận</Typography>
              ) : (
                photo.comments.map((comment) => (
                  <ListItem key={comment._id} disablePadding>
                    <ListItemText
                      primary={
                        <>
                          <Link to={`/users/${comment.user._id}`}>
                            {`${comment.user.first_name} ${comment.user.last_name}`}
                          </Link>
                          : {comment.comment}
                        </>
                      }
                      secondary={new Date(comment.date_time).toLocaleString('vi-VN')}
                    />
                  </ListItem>
                ))
              )}
            </List>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}