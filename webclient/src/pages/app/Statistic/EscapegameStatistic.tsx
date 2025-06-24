import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { GetEscapeGameDto } from '@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto';
import { StatisticDataDto } from '@/actions/statisticAction';
import { UnitofAction } from '../../../actions/UnitofAction';
import LineChartState from "@/components/factory/GenericComponent/StatisticModule";
import { Box, FormControl, Select } from '@mui/material';
import { GetOrganisationDto } from '@/interfaces/OrganisationInterface/Organisation/getOrganisationDto';
const EscapeGameStatistic = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<GetEscapeGameDto[]>([]);
  const [selectData,setSelectData]=useState<GetEscapeGameDto>(data[0]);
  const [error, setError] = useState<string | null>(null);
  const [statistics, setStatistics] = useState<StatisticDataDto[]>([]);
  const [organisation,setOrganisation] = useState<GetOrganisationDto | null >(null);
  const { isAuthenticated } = useAuth();

  const action = new UnitofAction();
 
  const fetchDataOrganisation = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await action.organisationAction.GetOrganisationByIdForCurrentUser();
      if (response.Success) {
        const statData = response.Data as GetOrganisationDto[];
        setOrganisation(statData[0]);
      } else {
        setError("Échec lors du chargement des statistiques.");
      }
    } catch (err) {
      setError("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      
      const escapeGameRep= await action.escapeGameAction.getAllEscapeGamesFromOrganisation(organisation.orgId,1,20);
        
      if ( escapeGameRep.Success) {
        const escapedata= escapeGameRep.Data as GetEscapeGameDto[];
        setData(escapedata);
      } else {
        setError("Échec lors du chargement des statistiques.");
      }
    } catch (err) {
      setError("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };
  const fetchData2 = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await action.statisticAction.getEscapeGameStatistics(selectData.esgId); // remplace cette.visitMethod si elle s'appelle différemment
      if (response.Success) {
        const statData = response.Data as StatisticDataDto[];
        setStatistics(statData);
      } else {
        setError("Échec lors du chargement des statistiques.");
      }
    } catch (err) {
      setError("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {

    if (isAuthenticated) {
      fetchDataOrganisation();
      fetchData();
        fetchData2();
    }
  }, [isAuthenticated]);

  const labels = statistics.map((s) => s.periode);
  const values = statistics.map((s) => s.data);

  return (
    <Box>
      <h1>EscapeGame Statistic</h1>
      <FormControl>
        <Select>
            {
                data.map((escapeGame) => (
                    <option key={escapeGame.esgId} value={escapeGame.esgId} onClick={() => setSelectData(escapeGame)}>
                        {escapeGame.esgTitle}
                    </option>
                ))
            }
           
        </Select>
      </FormControl>
      {isLoading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!isLoading && !error && statistics.length > 0 && (
        <LineChartState
          title="Statistiques d'activité"
          data={values}
          labels={labels}
        />
      )}
    </Box>
  );
};

export default EscapeGameStatistic;
