import React, {useState, useEffect} from "react";
import {Row, Col} from "react-bootstrap";

// models
import Base from "../../../models/Base";
import Product from "../../../models/Product";

// services
import productService from "../../../services/product.service";

// components
import Toolbar from "./Toolbar";
import Loading from "../../../components/spinners/Loading";
import Pagination from "../../../components/Task/Pagination";

// graphs
import PieGraph from "./PieGraph";
import BarGraph from "./BarGraph";
import RecGraph from "./RecGraph";

// types
import {PaginationProps} from "../../../components/Task/Pagination/types";

// styles
import {
    GridContainerTSC, 
    GridToolbar, 
    GridContent,
    GridFooter,
    GridContainerSidenav,
    GridContainerSidenavView,
    GridContainerSidenavContent,
    GridContainerSidenavFooter,
    GridContainerSidenavToolbar,
} from "../../../design/grid";
import {View} from "../../../design";
import {
  ProductOption, 
  Title, 
  Subtitle, 
  ProductText, 
  SearchInput,
  RowBootstrap,
} from "./styles";

// icons
import SearchIcon from '@material-ui/icons/Search';

export default function ExpirationDate() {
  const [base, setBase] = useState<Base | null>(null);
  const [visible, setVisible] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationProps>({
    limit: 10, 
    offset: 0, 
    page: 0,
    count: 0,
    text: "",
    order: "DESC", 
    filter: "name", 
    orderBy: "name",
  });

  function handleChangePagination(key: string, value: any) {
    setPagination(pagination => ({ ...pagination, [key]: value }));
  }

  function handleChangePage(page: number) {
    let offset = 0;
    if(page > 0) {
        offset = pagination.limit;
    }

    handleChangePagination("offset", offset);
    handleChangePagination("page", page);
  }

  function handleChangeRowsPerPage(event: any) {
    const rows_per_page = event.target.value;
    handleChangePagination("limit", rows_per_page);
  }

  async function index(base_id: string) {
    setLoading(true);
    try {
      const {count, rows} = await productService.pagination({
        ...pagination,
        base_id,
      });

      monit(rows[0], base_id);
      handleChangePagination("count", count);
      setProducts(rows);
    } catch (error) {
      setLoading(false);
    }
  }

  function handleChangeBase(base: Base) {
    setBase(base);
    setSelectedProduct(null);
    index(base.id);
  }

  function handleChangeProduct(product: Product) {
    setSelectedProduct(product);
  }

  function toggleVisible() {
    setVisible(!visible);
  }

  useEffect(() => {
    if(base) {
      index(base.id);
    }
  }, [
    pagination.text,
    pagination.limit,
    pagination.offset,
    pagination.page,
  ]);

  async function monit(product: Product, base_id: string) {
    try {
      let monit_product = await productService.monit(product.id, base_id);
      product.expired_quantity = monit_product.expired_quantity;
      product.under_30_days_quantity = monit_product.under_30_days_quantity;
      product.over_30_days_quantity = monit_product.over_30_days_quantity;
      product.registered_lots_quantity = monit_product.registered_lots_quantity;
      product.exhausted_lots_quantity = monit_product.exhausted_lots_quantity;
      product.expired_quantity = monit_product.expired_quantity;
      product.input_quantity = monit_product.input_quantity;
      product.output_quantity = monit_product.output_quantity;
      product.stock_quantity = monit_product.stock_quantity;

      handleChangeProduct(product);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  return(
    <GridContainerTSC sidenavVisible={visible}>
        <GridToolbar>
            <Toolbar 
              title="Prazo de validade" 
              onChange={handleChangeBase} 
              onChangeSidenavVisible={toggleVisible} 
            />
        </GridToolbar>
        <GridContainerSidenav className={visible ? "slide-in-left" : "slide-out-left"}>
          <GridContainerSidenavView>
            <GridContainerSidenavToolbar>
              <SearchInput 
                name="text"
                value={pagination.text}
                onChange={(e: any) => {
                  const {name, value} = e.target;
                  handleChangePagination(name, value);
                }}
                adorment={<SearchIcon className="icon" />} 
                adormentPosition="start" placeholder="Pesquisar por..." 
              />
            </GridContainerSidenavToolbar>
            <GridContainerSidenavContent>
              {loading ? <Loading /> : (
                products.map(product => (
                  <ProductOption onClick={() => {
                    if(base) {
                      monit(product, base.id);
                    }
                  }}>
                    <ProductText>{product.name}</ProductText>
                  </ProductOption>
                ))
              )}
            </GridContainerSidenavContent>
            <GridContainerSidenavFooter>
              <Pagination 
                page={pagination.page} 
                limit={pagination.limit} 
                count={pagination.count} 
                labelRowsPerPage=""
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </GridContainerSidenavFooter>
          </GridContainerSidenavView>
        </GridContainerSidenav>
        <GridContent>
            {selectedProduct && base && (
              <RowBootstrap>
                <Col sm="4">
                  <View style={{padding: 10, marginBottom: 10}}>
                    <Title>Panorama</Title>
                    <Subtitle>{selectedProduct.name}</Subtitle>
                    <RecGraph product={selectedProduct} />
                  </View>
                </Col>
                <Col sm="4">
                  <View style={{padding: 10, marginBottom: 10}}>
                    <Title>Status da validade</Title>
                    <Subtitle>{selectedProduct.name}</Subtitle>
                    <PieGraph product={selectedProduct} />
                  </View>
                </Col>
                <Col sm="4">
                  <View style={{padding: 10}}>
                    <Title>Lotes x Produtos Esgotados</Title>
                    <Subtitle>{selectedProduct.name}</Subtitle>
                    <BarGraph product={selectedProduct} />
                  </View>
                </Col>
              </RowBootstrap>
            )}
        </GridContent>
    </GridContainerTSC>
  );
}