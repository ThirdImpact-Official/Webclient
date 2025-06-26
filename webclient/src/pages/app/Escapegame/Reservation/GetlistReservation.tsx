const gestlistreservation = () => {
    return (
        <Card>
        <CardHeader
          title="Reservations"
          action={
            <>
              <Typography variant="h5">Filtre</Typography>               
              <FormControl sx={{ m: 1 }} variant="standard">
                <Select>
                  <MenuItem>A</MenuItem>
                  <MenuItem>B</MenuItem>
                </Select>
              </FormControl>
              <FormControl className='flex flex-row space-x-10 float-end justify-end items-end'>
                <Button
                  variant='contained'
                  color='warning'
                  onClick={fetchReservations}>Refresh</Button>
              </FormControl>
            </>
          }/>
        <CardContent>
            <GetReservationTable
                data={reservations}
                columns={columns}
                OnDetails={handleDetails}
                OnUpdate={handleUpdate} />
        </CardContent>
        </Card>
    );
};