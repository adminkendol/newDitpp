import React, { Component } from 'react';
import { 
	Container, Content, Header,
	Form, Item, Input, Label,
	Body,Card, CardItem,
	Button,Text,H1,H2,H3 
	} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from "./style_login";
export default class Sigin extends Component {
	
  render() {
    return (
      <Container style={styles.bgpage}>
	  	<Content>
				<Form style={styles.form_input}>
					<Card>
						<CardItem style={styles.form_card}>
							<Body>
								<H2 style={styles.text_title}>Welcome, please login</H2>
								<Item rounded style={styles.input_text}>
									<Input  placeholder='Username'/>
								</Item>
								<Item rounded style={styles.input_text}>
									<Input  placeholder='Password'/>
								</Item>
								<Button medium rounded 
									style={styles.form_button}
									onPress={() => this.props.navigation.navigate("Home")}>
									<Text>Login</Text>
								</Button>
							</Body>
						</CardItem>
					</Card>
				</Form>
			</Content>
      </Container>
    );
  }
}
