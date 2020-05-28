/* eslint-disable import/no-duplicates */
import React, { useState, useEffect } from 'react';
import { format, parseJSON } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get('/transactions');
      const { transactions: t, balance: b } = response.data;

      setTransactions(
        t.map((tr: Transaction) => {
          tr.formattedValue =
            tr.type === 'income'
              ? formatValue(tr.value)
              : `- ${formatValue(tr.value)}`;

          tr.formattedDate = format(parseJSON(tr.created_at), 'dd/MM/yyyy', {
            locale: ptBR,
          });
          return tr;
        }),
      );
      setBalance({
        income: formatValue(b.income),
        outcome: formatValue(b.outcome),
        total: formatValue(b.total),
      });
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions &&
                transactions.map(t => (
                  <tr key={t.id}>
                    <td className="title">{t.title}</td>
                    <td className={t.type}>{t.formattedValue}</td>
                    <td>{t.category.title}</td>
                    <td>{t.formattedDate}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
