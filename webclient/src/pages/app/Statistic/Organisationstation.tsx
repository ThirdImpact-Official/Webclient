import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { GetEscapeGameDto, GetOrganisationDto } from '@/interfaces';
import { StatisticDataDto } from '@/actions/statisticAction';
import { UnitofAction } from '@/actions/UnitofAction';
import LineChartState from '@/components/factory/GenericComponent/StatisticModule';

export const OrganisationStatistic = () => {
  const [isLoading, setLoading] = useState(true);
  const [escapeGames, setEscapeGames] = useState<GetEscapeGameDto[]>([]);
  const [selectedEscapeGame, setSelectedEscapeGame] = useState<GetEscapeGameDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statistics, setStatistics] = useState<StatisticDataDto[]>([]);
  const [organisation, setOrganisation] = useState<GetOrganisationDto | null>(null);
  const { isAuthenticated } = useAuth();

  const action = new UnitofAction();
   const labels = statistics.map((statistic) => statistic.periode);
    const row= statistics.map((statistic) => statistic.data);
    const fetchDataOrganisation = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await action.organisationAction.GetOrganisationByIdForCurrentUser();
      if (response.Success) {
        const statData = response.Data as GetOrganisationDto[];
        setOrganisation(statData[0]);
      } else {
        setError('Failed to load organisation statistics.');
      }
    } catch (err) {
      setError('An error occurred while loading organisation statistics.');
    } finally {
      setLoading(false);
    }
  };
  const fetchDatastaticis = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await action.statisticAction.getOrganisationStatistics(organisation?.organisationId!);
      if (response.Success) {
        const statData = response.Data as GetOrganisationDto[];
        setOrganisation(statData[0]);
      } else {
        setError('Failed to load organisation statistics.');
      }
    } catch (err) {
      setError('An error occurred while loading organisation statistics.');
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (isAuthenticated) {
      fetchDataOrganisation();
      fetchDatastaticis();
    }
  }, [isAuthenticated]);
    

        
      
    return (
        <div>
        {isLoading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!isLoading && !error && statistics.length > 0 && (
        <LineChartState
          title="Statistiques d'activité"
          data={row}
          labels={labels}
        />
      )}
        </div>
    )
}