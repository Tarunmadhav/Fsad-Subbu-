import { useState } from 'react';
import { Card, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import { FileMetadata } from '../../types';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { ShareModal } from './ShareModal';
import { useToast } from '../../context/ToastContext';

interface FileCardProps {
  file: FileMetadata;
}

export const FileCard = ({ file }: FileCardProps) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const { showToast } = useToast();

  const formatFileSize = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleShare = () => {
    setShareModalOpen(true);
  };

  const handleDownload = async () => {
    try {
      // TODO: Replace with actual API call
      showToast('Download started', 'info');
    } catch (error) {
      showToast('Download failed', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      // TODO: Replace with actual API call
      showToast('File deleted successfully', 'success');
    } catch (error) {
      showToast('Failed to delete file', 'error');
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div" noWrap>
            {file.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Size: {formatFileSize(file.size)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Uploaded: {formatDate(file.uploadDate)}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton size="small" onClick={handleShare}>
            <ShareIcon />
          </IconButton>
          <IconButton size="small" onClick={handleDownload}>
            <DownloadIcon />
          </IconButton>
          <IconButton size="small" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
      <ShareModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        file={file}
      />
    </>
  );

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div" noWrap>
            {file.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Size: {formatFileSize(file.size)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Uploaded: {formatDate(file.uploadDate)}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton size="small" onClick={handleShare}>
            <ShareIcon />
          </IconButton>
          <IconButton size="small" onClick={handleDownload}>
            <DownloadIcon />
          </IconButton>
          <IconButton size="small" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
      <ShareModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        file={file}
      />
    </>
  );
};
