import { Box, Grid, IconButton, Typography } from "@mui/material";
import { LinkedIn, GitHub, DynamicForm } from "@mui/icons-material";

function Footer() {
  return (
    <Box sx={{ bgcolor: "#f5f5f5", textAlign: "center", py: 2 }}>
      <Box sx={{ mx: 6, textAlign: { xs: "center", md: "left" } }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography
              color="textSecondary"
              variant="subtitle1"
              component="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", md: "flex-start" },
                fontWeight: "bold",
              }}
            >
              <DynamicForm sx={{ mr: 1 }} />
              PhotoGram
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Typography variant="body2" color="textSecondary" sx={{ mr: 2 }}>
                Get connected with us:
              </Typography>
              <IconButton
                href="https://github.com/pentagramma"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
              >
                <GitHub sx={{ color: '#6B6B6B', fontSize: 20 }} />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com/in/sarthak-kumar-034276258/"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
              >
                <LinkedIn sx={{ color: '#6B6B6B', fontSize: 20 }} />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              color="textSecondary"
              variant="subtitle1"
              component="h6"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              Contact Us
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Email: krsarthak.17@gmail.com
              <br />
              Phone: +91 7738319254
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Footer;