import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { GetEscapeGameDto } from '@/interfaces/EscapeGameInterface/EscapeGame/getEscapeGameDto';
import { StatisticDataDto } from '@/actions/statisticAction';
import { UnitofAction } from '../../../actions/UnitofAction';
import LineChartState from "@/components/factory/GenericComponent/StatisticModule";
import { Box, FormControl, Select, MenuItem } from '@mui/material';
import { GetOrganisationDto } from '@/interfaces/OrganisationInterface/Organisation/getOrganisationDto';

const EscapeGameStatistic = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<GetEscapeGameDto[]>([]);
  const [selectData, setSelectData] = useState<GetEscapeGameDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statistics, setStatistics] = useState<StatisticDataDto[]>([]);
  const [organisation, setOrganisation] = useState<GetOrganisationDto | null>(null);
  const { isAuthenticated } = useAuth();

  const action = new UnitofAction();

  const fetchDataOrganisation = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await action.organisationAction.GetOrganisationByIdForCurrentUser();
      console.log(response);
      if (response.Success) {
        const statData = response.Data as GetOrganisationDto;
        setOrganisation(statData);
      } else {
        setError("Échec lors du chargement des informations de l'organisation.");
      }
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const fetchEscapeGames = async () => {
    if (!organisation) return;
    setLoading(true);
    setError(null);
    try {
      const escapeGameRep = await action.escapeGameAction.getAllEscapeGamesFromOrganisation(organisation.orgId, 1, 20);
      console.log(escapeGameRep);
      if (escapeGameRep.Success) {
        const escapedata = escapeGameRep.Data as GetEscapeGameDto[];
        setData(escapedata);
        setSelectData(escapedata[0] || null); // On sélectionne le premier escape game par défaut
      } else {
        setError("Échec lors du chargement des escape games.");
      }
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    if (!selectData) return;
    setLoading(true);
    setError(null);
    try {
      const response = await action.statisticAction.getEscapeGameStatistics(selectData.esgId);
      if (response.Success) {
        const statData = response.Data as StatisticDataDto[];
        setStatistics(statData);
      } else {
        setError("Échec lors du chargement des statistiques.");
      }
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  // Étape 1 : charger l'organisation une fois authentifié
  useEffect(() => {
    if (isAuthenticated) {
      fetchDataOrganisation();
    }
  }, [isAuthenticated]);

  // Étape 2 : charger les escape games après organisation
  useEffect(() => {
    if (organisation) {
      fetchEscapeGames();
    }
  }, [organisation]);

  // Étape 3 : charger les statistiques quand on sélectionne un escape game
  useEffect(() => {
    if (selectData) {
      fetchStatistics();
    }
  }, [selectData]);

  const labels = statistics.map((s) => s.periode);
  const values = statistics.map((s) => s.data);

  return (
    <Box>
      <h1>Statistiques Escape Game</h1>

      <FormControl sx={{ minWidth: 250, marginBottom: 3 }}>
        <Select
          displayEmpty
          value={selectData?.esgId || ''}
          onChange={(e) => {
            const selected = data.find(d => d.esgId === e.target.value);
            if (selected) {
              setSelectData(selected);
            }
          }}
        >
          {data.map((escapeGame) => (
            <MenuItem key={escapeGame.esgId} value={escapeGame.esgId}>
              {escapeGame.esgTitle}
            </MenuItem>
          ))}
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
