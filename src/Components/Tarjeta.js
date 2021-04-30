import React, { useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { blue, green } from "@material-ui/core/colors";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

//https://proyecto-lenguaje.s3.us-east-2.amazonaws.com/abecedario/A.png

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 160,
  },
  tarjetaColor:{
    backgroundColor: '#F5634A',
  },
});

const AutoRotatingCarouselModal = ({ handleOpen, setHandleOpen, isMobile, fotos }) => {
    return (
      <div> 
        {/* <Button onClick={() => setHandleOpen({ open: true })}>Open carousel</Button> */}
        <AutoRotatingCarousel
          label="Cerrar"
          open={handleOpen.open}
          onClose={() => setHandleOpen({ open: false })}
          onStart={() => setHandleOpen({ open: false })}
          autoplay={false}
          mobile={isMobile}
          style={{ position: "absolute" }}
        >
          <Slide
            media={
              <img src="https://www.olondriz.com/wp-content/uploads/2020/04/ambar-perrito-1-1024x899.jpg" />
            }
            mediaBackgroundStyle={{ backgroundColor: '#95CFB7' }}
            style={{ backgroundColor: '#555152' }}
            title="Principal"
            subtitle="Abecedario jejeje."
          />
          {fotos}
        </AutoRotatingCarousel>
      </div>
    );
  };

export default function Tarjeta (props) {

        const classes = useStyles();

        const [handleOpen, setHandleOpen] = useState({ open: false });
        const handleClick = () => {
          setHandleOpen({ open: true });
        };
        const matches = useMediaQuery("(max-width:400px)");
        return (
            <>
            <Card className={classes.root}>
            <CardActionArea onClick={handleClick}>
                <CardMedia 
                className={classes.media}
                image={props.imagen}
                title="Contemplative Reptile"
                />
                <CardContent className={classes.tarjetaColor}>
                <Typography align='center' variant="h5" component="h2">
                    {props.Titulo}
                </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
            <AutoRotatingCarouselModal
                isMobile={matches}
                handleOpen={handleOpen}
                setHandleOpen={setHandleOpen}
                fotos = {props.fotos}
            />
            </>
        );
}