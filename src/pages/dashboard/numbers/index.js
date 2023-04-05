import { useCallback, useEffect, useMemo, useState } from "react";
import Download01Icon from "@untitled-ui/icons-react/build/esm/Download01";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import Upload01Icon from "@untitled-ui/icons-react/build/esm/Upload01";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { numbersApi } from "src/api/numbers";
import { Seo } from "src/components/seo";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { useSelection } from "src/hooks/use-selection";
import { NumberListSearch } from "src/sections/dashboard/number/number-list-search";
import { NumberListTable } from "src/sections/dashboard/number/number-list-table";

const useNumbersSearch = () => {
  const [state, setState] = useState({
    filters: {
      query: undefined,
      subscribed: undefined,
      unsubscribed: undefined,
      landline: undefined,
      mobile: undefined,
      hasAcceptedMarketing: undefined,
      isProspect: undefined,
      isReturning: undefined,
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: "updatedAt",
    sortDir: "desc",
  });

  const handleFiltersChange = useCallback((filters) => {
    setState((prevState) => ({
      ...prevState,
      filters,
    }));
  }, []);

  const handleSortChange = useCallback((sort) => {
    setState((prevState) => ({
      ...prevState,
      sortBy: sort.sortBy,
      sortDir: sort.sortDir,
    }));
  }, []);

  const handlePageChange = useCallback((event, page) => {
    setState((prevState) => ({
      ...prevState,
      page,
    }));
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setState((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10),
    }));
  }, []);

  return {
    handleFiltersChange,
    handleSortChange,
    handlePageChange,
    handleRowsPerPageChange,
    state,
  };
};

const useNumbersStore = (searchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    numbers: [],
    numbersCount: 0,
  });

  const handleNumbersGet = useCallback(async () => {
    try {
      const response = await numbersApi.getNumbers(searchState);
      if (isMounted()) {
        setState({
          numbers: response.data,
          numbersCount: response.count,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchState, isMounted]);

  useEffect(
    () => {
      handleNumbersGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  return {
    ...state,
  };
};

const useNumbersIds = (numbers = []) => {
  return useMemo(() => {
    return numbers.map((number) => number.id);
  }, [numbers]);
};

const Page = () => {
  const numbersSearch = useNumbersSearch();
  const numbersStore = useNumbersStore(numbersSearch.state);
  const numbersIds = useNumbersIds(numbersStore.numbers);
  const numbersSelection = useSelection(numbersIds);

  usePageView();

  return (
    <>
      <Seo title="Dashboard: Number List" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Numbers</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    size="small"
                    href="/dashboard/import-numbers"
                    startIcon={
                      <SvgIcon>
                        <Upload01Icon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    size="small"
                    startIcon={
                      <SvgIcon>
                        <Download01Icon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  href="/dashboard/import-numbers"
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </Stack>
            </Stack>
            <Card>
              <NumberListSearch
                onFiltersChange={numbersSearch.handleFiltersChange}
                onSortChange={numbersSearch.handleSortChange}
                sortBy={numbersSearch.state.sortBy}
                sortDir={numbersSearch.state.sortDir}
              />
              <NumberListTable
                count={numbersStore.numbersCount}
                items={numbersStore.numbers}
                onDeselectAll={numbersSelection.handleDeselectAll}
                onDeselectOne={numbersSelection.handleDeselectOne}
                onPageChange={numbersSearch.handlePageChange}
                onRowsPerPageChange={numbersSearch.handleRowsPerPageChange}
                onSelectAll={numbersSelection.handleSelectAll}
                onSelectOne={numbersSelection.handleSelectOne}
                page={numbersSearch.state.page}
                rowsPerPage={numbersSearch.state.rowsPerPage}
                selected={numbersSelection.selected}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
