import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'warning' | 'critical' | 'success';
  trend?: {
    value: number;
    label: string;
  };
}

const variantClasses = {
  default: 'border-border',
  warning: 'border-fuel-warning bg-gradient-to-br from-background to-fuel-warning/5',
  critical: 'border-fuel-critical bg-gradient-to-br from-background to-fuel-critical/5',
  success: 'border-accent bg-gradient-to-br from-background to-accent/5'
};

const badgeVariants = {
  default: 'secondary',
  warning: 'outline',
  critical: 'destructive',
  success: 'default'
} as const;

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  description,
  icon,
  variant = 'default',
  trend
}) => {
  return (
    <Card className={`${variantClasses[variant]} shadow-card hover:shadow-elevated transition-shadow`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="h-4 w-4 text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <Badge variant={badgeVariants[variant]} className="text-xs">
              {trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};