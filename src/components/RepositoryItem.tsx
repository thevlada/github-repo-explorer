import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Card,
  CardContent,
  Typography,
  Link,
  Chip,
  Box,
  Tooltip,
} from '@mui/material';
import {
  Star as StarIcon,
  ForkRight as ForkIcon,
  Circle as CircleIcon,
} from '@mui/icons-material';
import { Repository } from '../types/repository';
import { formatNumber, formatRelativeTime } from '../utils/formatters';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const RepositoryHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  gap: theme.spacing(1),
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(1),
}));

const StatItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  color: theme.palette.text.secondary,
}));

const LanguageChip = styled(Chip)<{ languagecolor?: string }>(
  ({ theme, languagecolor }) => ({
    backgroundColor: languagecolor || theme.palette.grey[300],
    color: theme.palette.getContrastText(
      languagecolor || theme.palette.grey[300]
    ),
    fontWeight: 500,
  })
);

interface RepositoryItemProps {
  repository: Repository;
}

export const RepositoryItem: React.FC<RepositoryItemProps> = ({
  repository,
}) => {
  const {
    name,
    url,
    stargazerCount,
    forkCount,
    description,
    primaryLanguage,
    updatedAt,
  } = repository;

  return (
    <StyledCard>
      <CardContent>
        <RepositoryHeader>
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            variant="h6"
            color="primary"
            underline="hover"
            sx={{ fontWeight: 600 }}
          >
            {name}
          </Link>
          {primaryLanguage && (
            <LanguageChip
              size="small"
              label={primaryLanguage.name}
              languagecolor={primaryLanguage.color}
              icon={
                <CircleIcon
                  sx={{
                    color: primaryLanguage.color,
                    fontSize: '12px !important',
                  }}
                />
              }
            />
          )}
        </RepositoryHeader>

        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: 1 }}
          >
            {description}
          </Typography>
        )}

        <StatsContainer>
          <StatItem>
            <StarIcon fontSize="small" />
            <Typography variant="body2">
              🌟 {formatNumber(stargazerCount)}
            </Typography>
          </StatItem>

          <StatItem>
            <ForkIcon fontSize="small" />
            <Typography variant="body2">
              🍴 {formatNumber(forkCount)}
            </Typography>
          </StatItem>

          <Tooltip title={new Date(updatedAt).toLocaleString()}>
            <Typography variant="body2" color="text.secondary">
              Updated {formatRelativeTime(updatedAt)}
            </Typography>
          </Tooltip>
        </StatsContainer>
      </CardContent>
    </StyledCard>
  );
};
