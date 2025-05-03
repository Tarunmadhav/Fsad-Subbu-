import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box
} from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import { FileMetadata } from '../../types';
import { useToast } from '../../context/ToastContext';

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  file: FileMetadata;
}

export const ShareModal = ({ open, onClose, file }: ShareModalProps) => {
  const [shareKey, setShareKey] = useState<string | null>(null);
  const [expirationHours, setExpirationHours] = useState('24');
  const { showToast } = useToast();

  const handleGenerateKey = async () => {
    try {
      // TODO: Replace with actual API call
      const key = Math.random().toString(36).substring(2, 8).toUpperCase();
      setShareKey(key);
      showToast('Share key generated successfully', 'success');
    } catch (error) {
      showToast('Failed to generate share key', 'error');
    }
  };

  const getShareUrl = () => {
    return `${window.location.origin}/share/${shareKey}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getShareUrl());
    showToast('Link copied to clipboard', 'success');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Share File: {file.name}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 2 }}>
          <TextField
            label="Expiration (hours)"
            type="number"
            value={expirationHours}
            onChange={(e) => setExpirationHours(e.target.value)}
            inputProps={{ min: 1, max: 168 }}
          />

          {shareKey ? (
            <>
              <Typography variant="h6" gutterBottom>
                Share Key: {shareKey}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <QRCodeSVG value={getShareUrl()} size={200} />
              </Box>

              <Button variant="outlined" onClick={handleCopyLink}>
                Copy Share Link
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={handleGenerateKey}>
              Generate Share Key
            </Button>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
