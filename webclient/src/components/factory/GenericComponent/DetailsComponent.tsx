import { Box, Typography, Card, CardContent, Stack, Divider, Grid } from '@mui/material';

interface ColumnConfig<T> {
  label: string;
  accessor: keyof T;
  type?: 'text' | 'image' | 'images';
  imageProps?: {
    width?: number | string;
    height?: number | string;
  };
}

interface DetailsProps<T> {
  data: T;
  columns: ColumnConfig<T>[];
}

const DetailsComponent = <T,>({ data, columns }: DetailsProps<T>) => {
  if (!data) {
    return (
      <Box textAlign="center" p={4}>
        <Typography sx={{ color: "#57606a" }}>
          Aucune donnée disponible
        </Typography>
      </Box>
    );
  }

  const renderImage = (src: string, alt: string, props?: ColumnConfig<T>['imageProps']) => (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        width: props?.width || '100%',
        height: props?.height || 200,
        objectFit: 'cover',
        borderRadius: "6px",
        mt: 1,
        border: "1px solid #d0d7de",
        backgroundColor: "#f6f8fa",
        display: 'block'
      }}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );

  const renderImagesGrid = (images: string[], alt: string, props?: ColumnConfig<T>['imageProps']) => (
    <Grid container spacing={1} mt={1}>
      {images.map((src, index) => (
        <Grid item xs={6} key={index}>
          {renderImage(src, `${alt} ${index + 1}`, props)}
        </Grid>
      ))}
    </Grid>
  );

  const renderValue = (column: ColumnConfig<T>, value: any) => {
    if (column.type === 'image' && value) {
      return renderImage(value, column.label, column.imageProps);
    }

    if (column.type === 'images' && Array.isArray(value) && value.length > 0) {
      return renderImagesGrid(value, column.label, column.imageProps);
    }

    return (
      <Typography sx={{ color: "#24292f", mt: 0.5 }}>
        {value || "-"}
      </Typography>
    );
  };

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: "6px",
        border: "1px solid #d0d7de",
        backgroundColor: "#ffffff",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          {columns.map((column, index) => {
            const value = data[column.accessor];

            return (
              <Box key={column.accessor as string}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#57606a",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                  }}
                >
                  {column.label}
                </Typography>

                {renderValue(column, value)}

                {index < columns.length - 1 && (
                  <Divider sx={{ my: 2, borderColor: "#d8dee4" }} />
                )}
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DetailsComponent;
