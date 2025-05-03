import { FileMetadata } from '../../types';
import { Typography, Box } from '@mui/material';
import { FileCard } from '../files/FileCard';

export const Dashboard = () => {
  // TODO: Replace with actual API call
  const files: FileMetadata[] = [
    {
      id: '1',
      name: 'example.pdf',
      size: 1024 * 1024, // 1MB
      type: 'application/pdf',
      owner: 'user1',
      uploadDate: new Date().toISOString()
    }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Files
      </Typography>

      <Box 
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr',
            lg: '1fr 1fr 1fr 1fr'
          },
          gap: 3
        }}
      >
        {files.map((file) => (
          <Box key={file.id}>
            <FileCard file={file} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
