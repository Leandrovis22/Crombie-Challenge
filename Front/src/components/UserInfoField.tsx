import { Box, Typography } from "@mui/material";

export const UserInfoField = ({ label, value }: { label: string, value: string }) => (
  <Box display="flex" alignItems="center">
    <Typography variant="h6" sx={{ fontSize: '1rem' }}>{label}:</Typography>
    <Typography variant="body1" sx={{ marginLeft: '0.5rem', fontSize: '1rem' }}>{value}</Typography>
  </Box>
);
