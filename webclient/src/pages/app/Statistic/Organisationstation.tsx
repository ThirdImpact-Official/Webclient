import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { GetOrganisationDto } from '@/interfaces/OrganisationInterface/Organisation/getOrganisationDto';
import { StatisticDataDto } from '@/actions/statisticAction';
import { UnitofAction } from '@/actions/UnitofAction';
import LineChartState from '@/components/factory/GenericComponent/StatisticModule';

export const OrganisationStatistic = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statistics, setStatistics] = useState<StatisticDataDto[]>([]);
  const [organisation, setOrganisation] = useState<GetOrganisationDto | null>(null);
  const { isAuthenticated } = useAuth();

  const action = new UnitofAction();

  const labels = statistics.map((stat) => stat.periode);
  const row = statistics.map((stat) => stat.data);

  const fetchOrganisation = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await action.organisationAction.GetOrganisationByIdForCurrentUser();
      if (response.Success) {
        const organisations = response.Data as GetOrganisationDto[];
        setOrganisation(organisations[0]);
      } else {
        setError('Échec du chargement de l\'organisation.');
      }
    } catch (err) {
      console.error(err);
      setError('Erreur lors du chargement de l\'organisation.');
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async (orgId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await action.statisticAction.getOrganisationStatistics(Number(orgId));
      if (response.Success) {
        const statData = response.Data as StatisticDataDto[];
        setStatistics(statData);
      } else {
        setError('Échec du chargement des statistiques.');
      }
    } catch (err) {
      console.error(err);
      setError('Erreur lors du chargement des statistiques.');
    } finally {
      setLoading(false);
    }
  };

  // Étape 1 : charger l'organisation une fois authentifié
  useEffect(() => {
    if (isAuthenticated) {
      fetchOrganisation();
    }
  }, [isAuthenticated]);

  // Étape 2 : charger les stats quand on a l'organisation
  useEffect(() => {
    if (organisation) {
      fetchStatistics(organisation.orgId);
    }
  }, [organisation]);

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
  );
};
